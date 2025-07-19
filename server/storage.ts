import { users, progressUpdates, progressImages, type User, type InsertUser, type ProgressUpdate, type InsertProgressUpdate, type ProgressImage, type InsertProgressImage } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getProgressUpdates(): Promise<ProgressUpdate[]>;
  createProgressUpdate(update: InsertProgressUpdate): Promise<ProgressUpdate>;
  updateProgressUpdate(id: number, update: Partial<InsertProgressUpdate>): Promise<ProgressUpdate | undefined>;
  deleteProgressUpdate(id: number): Promise<boolean>;
  getProgressImages(): Promise<ProgressImage[]>;
  createProgressImage(image: InsertProgressImage): Promise<ProgressImage>;
  updateProgressImage(id: number, image: Partial<InsertProgressImage>): Promise<ProgressImage | undefined>;
  deleteProgressImage(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private progressUpdates: Map<number, ProgressUpdate>;
  private progressImages: Map<number, ProgressImage>;
  private currentUserId: number;
  private currentUpdateId: number;
  private currentImageId: number;

  constructor() {
    this.users = new Map();
    this.progressUpdates = new Map();
    this.progressImages = new Map();
    this.currentUserId = 1;
    this.currentUpdateId = 1;
    this.currentImageId = 1;

    // Initialize with some sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Add sample progress updates
    const update1: ProgressUpdate = {
      id: this.currentUpdateId++,
      week: "Week 12",
      title: "Core Mechanics Implementation",
      description: "Successfully implemented the base game mechanics and player interaction systems. The foundation is looking solid!",
      date: "2024-01-15",
      createdAt: new Date(),
    };
    this.progressUpdates.set(update1.id, update1);

    const update2: ProgressUpdate = {
      id: this.currentUpdateId++,
      week: "Week 11",
      title: "UI/UX Design Phase",
      description: "Completed the initial UI mockups and user flow diagrams. The interface is intuitive and engaging.",
      date: "2024-01-08",
      createdAt: new Date(),
    };
    this.progressUpdates.set(update2.id, update2);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProgressUpdates(): Promise<ProgressUpdate[]> {
    return Array.from(this.progressUpdates.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createProgressUpdate(insertUpdate: InsertProgressUpdate): Promise<ProgressUpdate> {
    const id = this.currentUpdateId++;
    const update: ProgressUpdate = { 
      ...insertUpdate, 
      id, 
      createdAt: new Date() 
    };
    this.progressUpdates.set(id, update);
    return update;
  }

  async getProgressImages(): Promise<ProgressImage[]> {
    return Array.from(this.progressImages.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createProgressImage(insertImage: InsertProgressImage): Promise<ProgressImage> {
    const id = this.currentImageId++;
    const image: ProgressImage = { 
      ...insertImage, 
      id, 
      createdAt: new Date(),
      description: insertImage.description || null
    };
    this.progressImages.set(id, image);
    return image;
  }

  async updateProgressUpdate(id: number, updateData: Partial<InsertProgressUpdate>): Promise<ProgressUpdate | undefined> {
    const existing = this.progressUpdates.get(id);
    if (!existing) return undefined;
    
    const updated: ProgressUpdate = { ...existing, ...updateData };
    this.progressUpdates.set(id, updated);
    return updated;
  }

  async deleteProgressUpdate(id: number): Promise<boolean> {
    return this.progressUpdates.delete(id);
  }

  async updateProgressImage(id: number, imageData: Partial<InsertProgressImage>): Promise<ProgressImage | undefined> {
    const existing = this.progressImages.get(id);
    if (!existing) return undefined;
    
    const updated: ProgressImage = { 
      ...existing, 
      ...imageData,
      description: imageData.description !== undefined ? imageData.description : existing.description
    };
    this.progressImages.set(id, updated);
    return updated;
  }

  async deleteProgressImage(id: number): Promise<boolean> {
    return this.progressImages.delete(id);
  }
}

export const storage = new MemStorage();
