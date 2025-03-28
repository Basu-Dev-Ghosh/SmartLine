// lib/mongodb.ts
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import bcrypt from "bcryptjs";
export interface AdminSettings {
  _id?: string | ObjectId;
  passwordHash: string;
  lastUpdated: Date;
}

// Define types for the contact forms
export interface ContactForm {
  _id?: string | ObjectId;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: Date;
}

export interface QuoteForm {
  _id?: string | ObjectId;
  name: string;
  email: string;
  phone: string;
  company: string;
  productInterest: string;
  requirements: string;
  budget?: string;
  timeline?: string;
  createdAt: Date;
}

// MongoDB connection URI - replace with your actual connection string
// Store this in an environment variable in production
const MONGODB_URI =
  process.env.NEXT_PUBLIC_MONGODB_URI ||
  "mongodb+srv://your-username:your-password@your-cluster.mongodb.net/?retryWrites=true&w=majority";
const MONGODB_DB = process.env.NEXT_PUBLIC_MONGODB_DB || "smartline_db";
const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || "development";

// MongoDB collections
const COLLECTIONS = {
  CONTACTS: "contacts",
  QUOTES: "quotes",
  ADMIN_SETTINGS: "admin_settings",
};

/**
 * MongoDB utility class to handle database operations
 */
class MongoDBService {
  private client: MongoClient | null = null;
  private static instance: MongoDBService;

  /**
   * Singleton pattern implementation
   */
  public static getInstance(): MongoDBService {
    if (!MongoDBService.instance) {
      MongoDBService.instance = new MongoDBService();
    }
    return MongoDBService.instance;
  }

  /**
   * Get MongoDB connection
   */
  private async getClient(): Promise<MongoClient> {
    if (!this.client) {
      try {
        let id_dev = environment == "development";
        this.client = new MongoClient(MONGODB_URI, {
          serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
          },
          ssl: true,
          tls: true,
          tlsAllowInvalidCertificates: id_dev,
        });
        await this.client.connect();
        console.log("Connected to MongoDB");
      } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
      }
    }
    return this.client;
  }

  /**
   * Initialize admin password if it doesn't exist
   * @param initialPassword The initial admin password to set
   */
  async initializeAdminPassword(
    initialPassword: string = process.env.NEXT_PUBLIC_ADMIN_PASSCODE!
  ): Promise<void> {
    try {
      const client = await this.getClient();
      const db = client.db(MONGODB_DB);
      const collection = db.collection(COLLECTIONS.ADMIN_SETTINGS);

      // Check if admin settings exist - use a string ID instead of ObjectId
      const existingSettings = await collection.findOne({
        _id: "admin",
      } as any);

      if (!existingSettings) {
        // Hash the password with bcrypt
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(initialPassword, salt);

        // Create new admin settings with string ID
        await collection.insertOne({
          _id: "admin", // Use string ID directly
          passwordHash,
          lastUpdated: new Date(),
        } as any);

        console.log("Admin password initialized");
      }
    } catch (error) {
      console.error("Error initializing admin password:", error);
      throw error;
    }
  }

  /**
   * Verify admin password
   * @param password Password to verify
   * @returns Boolean indicating if password is correct
   */
  async verifyAdminPassword(password: string): Promise<boolean> {
    try {
      const client = await this.getClient();
      const db = client.db(MONGODB_DB);
      const collection = db.collection(COLLECTIONS.ADMIN_SETTINGS);

      // Get admin settings - use string ID instead of ObjectId
      const adminSettings = await collection.findOne({ _id: "admin" } as any);

      if (!adminSettings) {
        // Initialize with default if not found
        await this.initializeAdminPassword();
        return password === process.env.NEXT_PUBLIC_ADMIN_PASSCODE; // Default first-time password
      }

      // Compare password with stored hash
      return await bcrypt.compare(password, adminSettings.passwordHash);
    } catch (error) {
      console.error("Error verifying admin password:", error);
      throw error;
    }
  }

  /**
   * Change admin password
   * @param currentPassword Current password for verification
   * @param newPassword New password to set
   * @returns Boolean indicating if password was successfully changed
   */
  async changeAdminPassword(
    currentPassword: string,
    newPassword: string
  ): Promise<boolean> {
    try {
      // First verify current password
      const isVerified = await this.verifyAdminPassword(currentPassword);

      if (!isVerified) {
        return false;
      }

      const client = await this.getClient();
      const db = client.db(MONGODB_DB);
      const collection = db.collection(COLLECTIONS.ADMIN_SETTINGS);

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(newPassword, salt);

      // Update admin settings - use string ID instead of ObjectId
      await collection.updateOne({ _id: "admin" } as any, {
        $set: {
          passwordHash,
          lastUpdated: new Date(),
        },
      });

      return true;
    } catch (error) {
      console.error("Error changing admin password:", error);
      throw error;
    }
  }

  /**
   * Create a contact form submission
   * @param contactData Contact form data
   * @returns The created document
   */
  async createContactSubmission(
    contactData: Omit<ContactForm, "_id" | "createdAt">
  ): Promise<ContactForm> {
    try {
      const client = await this.getClient();
      const db = client.db(MONGODB_DB);
      const collection = db.collection(COLLECTIONS.CONTACTS);

      const newContact: ContactForm = {
        ...contactData,
        createdAt: new Date(),
      };

      const result = await collection.insertOne(newContact as any);

      return {
        ...newContact,
        _id: result.insertedId,
      };
    } catch (error) {
      console.error("Error creating contact submission:", error);
      throw error;
    }
  }

  /**
   * Create a quote request submission
   * @param quoteData Quote form data
   * @returns The created document
   */
  async createQuoteSubmission(
    quoteData: Omit<QuoteForm, "_id" | "createdAt">
  ): Promise<QuoteForm> {
    try {
      const client = await this.getClient();
      const db = client.db(MONGODB_DB);
      const collection = db.collection(COLLECTIONS.QUOTES);

      const newQuote: QuoteForm = {
        ...quoteData,
        createdAt: new Date(),
      };

      const result = await collection.insertOne(newQuote as any);

      return {
        ...newQuote,
        _id: result.insertedId,
      };
    } catch (error) {
      console.error("Error creating quote submission:", error);
      throw error;
    }
  }

  /**
   * Get all contact submissions with pagination
   * @param page Page number (starts at 1)
   * @param limit Number of items per page
   * @returns Array of contact submissions
   */
  async getContactSubmissions(
    page = 1,
    limit = 10
  ): Promise<{ contacts: ContactForm[]; total: number }> {
    try {
      const client = await this.getClient();
      const db = client.db(MONGODB_DB);
      const collection = db.collection(COLLECTIONS.CONTACTS);

      const skip = (page - 1) * limit;

      const [contacts, total] = await Promise.all([
        collection
          .find({})
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .toArray(),
        collection.countDocuments({}),
      ]);

      return {
        contacts: contacts as unknown as ContactForm[],
        total,
      };
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      throw error;
    }
  }

  /**
   * Get all quote submissions with pagination
   * @param page Page number (starts at 1)
   * @param limit Number of items per page
   * @returns Array of quote submissions
   */
  async getQuoteSubmissions(
    page = 1,
    limit = 10
  ): Promise<{ quotes: QuoteForm[]; total: number }> {
    try {
      const client = await this.getClient();
      const db = client.db(MONGODB_DB);
      const collection = db.collection(COLLECTIONS.QUOTES);

      const skip = (page - 1) * limit;

      const [quotes, total] = await Promise.all([
        collection
          .find({})
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .toArray(),
        collection.countDocuments({}),
      ]);

      return {
        quotes: quotes as unknown as QuoteForm[],
        total,
      };
    } catch (error) {
      console.error("Error fetching quote submissions:", error);
      throw error;
    }
  }

  /**
   * Get a single contact submission by ID
   * @param id Contact submission ID
   * @returns Contact submission or null if not found
   */
  async getContactById(id: string): Promise<ContactForm | null> {
    try {
      const client = await this.getClient();
      const db = client.db(MONGODB_DB);
      const collection = db.collection(COLLECTIONS.CONTACTS);

      const contact = await collection.findOne({ _id: new ObjectId(id) });
      return contact as unknown as ContactForm;
    } catch (error) {
      console.error("Error fetching contact by ID:", error);
      throw error;
    }
  }

  /**
   * Get a single quote submission by ID
   * @param id Quote submission ID
   * @returns Quote submission or null if not found
   */
  async getQuoteById(id: string): Promise<QuoteForm | null> {
    try {
      const client = await this.getClient();
      const db = client.db(MONGODB_DB);
      const collection = db.collection(COLLECTIONS.QUOTES);

      const quote = await collection.findOne({ _id: new ObjectId(id) });
      return quote as unknown as QuoteForm;
    } catch (error) {
      console.error("Error fetching quote by ID:", error);
      throw error;
    }
  }

  /**
   * Update a contact submission
   * @param id Contact submission ID
   * @param updateData Updated contact data
   * @returns Updated contact submission
   */
  async updateContact(
    id: string,
    updateData: Partial<ContactForm>
  ): Promise<ContactForm | null> {
    try {
      const client = await this.getClient();
      const db = client.db(MONGODB_DB);
      const collection = db.collection(COLLECTIONS.CONTACTS);

      // Remove _id and createdAt from update data if present
      const { _id, createdAt, ...dataToUpdate } = updateData;

      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...dataToUpdate, updatedAt: new Date() } },
        { returnDocument: "after" }
      );

      return result as unknown as ContactForm;
    } catch (error) {
      console.error("Error updating contact:", error);
      throw error;
    }
  }

  /**
   * Update a quote submission
   * @param id Quote submission ID
   * @param updateData Updated quote data
   * @returns Updated quote submission
   */
  async updateQuote(
    id: string,
    updateData: Partial<QuoteForm>
  ): Promise<QuoteForm | null> {
    try {
      const client = await this.getClient();
      const db = client.db(MONGODB_DB);
      const collection = db.collection(COLLECTIONS.QUOTES);

      // Remove _id and createdAt from update data if present
      const { _id, createdAt, ...dataToUpdate } = updateData;

      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...dataToUpdate, updatedAt: new Date() } },
        { returnDocument: "after" }
      );

      return result as unknown as QuoteForm;
    } catch (error) {
      console.error("Error updating quote:", error);
      throw error;
    }
  }

  /**
   * Delete a contact submission
   * @param id Contact submission ID
   * @returns True if deletion was successful
   */
  async deleteContact(id: string): Promise<boolean> {
    try {
      const client = await this.getClient();
      const db = client.db(MONGODB_DB);
      const collection = db.collection(COLLECTIONS.CONTACTS);

      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    } catch (error) {
      console.error("Error deleting contact:", error);
      throw error;
    }
  }

  /**
   * Delete a quote submission
   * @param id Quote submission ID
   * @returns True if deletion was successful
   */
  async deleteQuote(id: string): Promise<boolean> {
    try {
      const client = await this.getClient();
      const db = client.db(MONGODB_DB);
      const collection = db.collection(COLLECTIONS.QUOTES);

      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    } catch (error) {
      console.error("Error deleting quote:", error);
      throw error;
    }
  }

  /**
   * Search contact submissions
   * @param query Search query
   * @param page Page number
   * @param limit Items per page
   * @returns Matching contact submissions
   */
  async searchContacts(
    query: string,
    page = 1,
    limit = 10
  ): Promise<{ contacts: ContactForm[]; total: number }> {
    try {
      const client = await this.getClient();
      const db = client.db(MONGODB_DB);
      const collection = db.collection(COLLECTIONS.CONTACTS);

      const searchRegex = new RegExp(query, "i");
      const filter = {
        $or: [
          { name: { $regex: searchRegex } },
          { email: { $regex: searchRegex } },
          { subject: { $regex: searchRegex } },
          { message: { $regex: searchRegex } },
        ],
      };

      const skip = (page - 1) * limit;

      const [contacts, total] = await Promise.all([
        collection
          .find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .toArray(),
        collection.countDocuments(filter),
      ]);

      return {
        contacts: contacts as unknown as ContactForm[],
        total,
      };
    } catch (error) {
      console.error("Error searching contacts:", error);
      throw error;
    }
  }

  /**
   * Search quote submissions
   * @param query Search query
   * @param page Page number
   * @param limit Items per page
   * @returns Matching quote submissions
   */
  async searchQuotes(
    query: string,
    page = 1,
    limit = 10
  ): Promise<{ quotes: QuoteForm[]; total: number }> {
    try {
      const client = await this.getClient();
      const db = client.db(MONGODB_DB);
      const collection = db.collection(COLLECTIONS.QUOTES);

      const searchRegex = new RegExp(query, "i");
      const filter = {
        $or: [
          { name: { $regex: searchRegex } },
          { email: { $regex: searchRegex } },
          { company: { $regex: searchRegex } },
          { productInterest: { $regex: searchRegex } },
          { requirements: { $regex: searchRegex } },
        ],
      };

      const skip = (page - 1) * limit;

      const [quotes, total] = await Promise.all([
        collection
          .find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .toArray(),
        collection.countDocuments(filter),
      ]);

      return {
        quotes: quotes as unknown as QuoteForm[],
        total,
      };
    } catch (error) {
      console.error("Error searching quotes:", error);
      throw error;
    }
  }

  /**
   * Close the MongoDB connection
   */
  async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      console.log("MongoDB connection closed");
    }
  }
}

// Export a singleton instance
export const mongoDBService = MongoDBService.getInstance();
