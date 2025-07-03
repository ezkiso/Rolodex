import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { CapacitorSQLite } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class SQLiteService {
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private isServiceReady = false;

  async initialize(): Promise<void> {
    if (Capacitor.getPlatform() === 'web') {
      console.warn("SQLite no funciona en la web, usando localStorage como fallback");
      return;
    }

    try {
      await this.sqlite.checkConnectionsConsistency();
      this.isServiceReady = true;
    } catch (error) {
      console.error("Error inicializando SQLite:", error);
    }
  }

  async createConnection(
    dbName: string, 
    encrypted: boolean, 
    mode: string, 
    version: number
  ): Promise<SQLiteDBConnection> {
    if (!this.isServiceReady) await this.initialize();
    
    // Añadimos el quinto parámetro readonly (false para permitir escritura)
    return this.sqlite.createConnection(dbName, encrypted, mode, version, false);
  }
}