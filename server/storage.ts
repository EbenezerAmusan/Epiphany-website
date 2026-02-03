import {
  type User,
  type InsertUser,
  type Product,
  type InsertProduct,
  type PigletReservation,
  type InsertPigletReservation,
  type NewsletterSubscriber,
  type InsertNewsletterSubscriber,
  type CartItem,
  type InsertCartItem,
  type FarmBooking,
  type InsertFarmBooking,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Products
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Piglet Reservations
  createPigletReservation(reservation: InsertPigletReservation): Promise<PigletReservation>;
  getPigletReservations(): Promise<PigletReservation[]>;

  // Newsletter
  subscribeNewsletter(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  getNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;

  // Cart
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartQuantity(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<void>;
  clearCart(sessionId: string): Promise<void>;

  // Farm Bookings
  createFarmBooking(booking: InsertFarmBooking): Promise<FarmBooking>;
  getFarmBookings(): Promise<FarmBooking[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private pigletReservations: Map<string, PigletReservation>;
  private newsletterSubscribers: Map<string, NewsletterSubscriber>;
  private cartItems: Map<string, CartItem>;
  private farmBookings: Map<string, FarmBooking>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.pigletReservations = new Map();
    this.newsletterSubscribers = new Map();
    this.cartItems = new Map();
    this.farmBookings = new Map();

    this.seedProducts();
  }

  private seedProducts() {
    const defaultProducts: InsertProduct[] = [
      { name: "Palm Oil - 5 Ltr", price: 11500, priceUnit: "per item", category: "crops", image: "/assets/palm_oil_1_a75e74_1770114904945.jpg" },
      { name: "Tomatoes", price: 450, priceUnit: "per kg", category: "crops", image: "/assets/tomato_1_fb9d01_1770114904946.jpg" },
      { name: "Pepper", price: 350, priceUnit: "per kg", category: "crops", image: "/assets/pepper_2_1_bda6b5_1770114904945.jpg" },
      { name: "Spices - Curry", price: 2500, priceUnit: "per kg", category: "crops", subcategory: "spices" },
      { name: "Spices - Thyme", price: 2500, priceUnit: "per kg", category: "crops", subcategory: "spices" },
      { name: "Spices - Ginger", price: 2500, priceUnit: "per kg", category: "crops", subcategory: "spices" },
      { name: "Spices - Garlic", price: 2500, priceUnit: "per kg", category: "crops", subcategory: "spices" },
      { name: "TN - Piglet", price: 150000, priceUnit: "per item", category: "animals", image: "/assets/img_20250703_wa0086_2_bc6300_1770114904941.jpg" },
      { name: "Landrace - Piglet", price: 150000, priceUnit: "per item", category: "animals" },
      { name: "Duroc - Piglet", price: 180000, priceUnit: "per item", category: "animals" },
      { name: "Cow", price: 850000, priceUnit: "per item", category: "animals" },
      { name: "Goat", price: 85000, priceUnit: "per item", category: "animals", image: "/assets/adorable_black_goat_with_brown_patterns_zoo_3_07320f_1770114904939.jpg" },
      { name: "Giant Land Snail", price: 2000, priceUnit: "per item", category: "animals" },
    ];

    defaultProducts.forEach((product) => {
      const id = randomUUID();
      this.products.set(id, { ...product, id, inStock: true });
    });
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { ...insertProduct, id, inStock: true };
    this.products.set(id, product);
    return product;
  }

  // Piglet Reservations
  async createPigletReservation(reservation: InsertPigletReservation): Promise<PigletReservation> {
    const id = randomUUID();
    const newReservation: PigletReservation = {
      ...reservation,
      id,
      createdAt: new Date(),
    };
    this.pigletReservations.set(id, newReservation);
    return newReservation;
  }

  async getPigletReservations(): Promise<PigletReservation[]> {
    return Array.from(this.pigletReservations.values());
  }

  // Newsletter
  async subscribeNewsletter(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const existing = Array.from(this.newsletterSubscribers.values()).find(
      (s) => s.email === subscriber.email
    );
    if (existing) return existing;

    const id = randomUUID();
    const newSubscriber: NewsletterSubscriber = {
      ...subscriber,
      id,
      subscribedAt: new Date(),
    };
    this.newsletterSubscribers.set(id, newSubscriber);
    return newSubscriber;
  }

  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return Array.from(this.newsletterSubscribers.values());
  }

  // Cart
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      (item) => item.sessionId === sessionId
    );
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    const existing = Array.from(this.cartItems.values()).find(
      (i) => i.sessionId === item.sessionId && i.productId === item.productId
    );

    if (existing) {
      existing.quantity += item.quantity;
      return existing;
    }

    const id = randomUUID();
    const cartItem: CartItem = { ...item, id };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartQuantity(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      return item;
    }
    return undefined;
  }

  async removeFromCart(id: string): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<void> {
    const items = await this.getCartItems(sessionId);
    items.forEach((item) => this.cartItems.delete(item.id));
  }

  // Farm Bookings
  async createFarmBooking(booking: InsertFarmBooking): Promise<FarmBooking> {
    const id = randomUUID();
    const newBooking: FarmBooking = {
      ...booking,
      id,
      createdAt: new Date(),
    };
    this.farmBookings.set(id, newBooking);
    return newBooking;
  }

  async getFarmBookings(): Promise<FarmBooking[]> {
    return Array.from(this.farmBookings.values());
  }
}

export const storage = new MemStorage();
