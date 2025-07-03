import { Injectable } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { SQLiteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
    private db!: SQLiteDBConnection;
    
    constructor(private sqliteService: SQLiteService) {}

    async init(): Promise<void> {
        this.db = await this.sqliteService.createConnection('my_database', false, 'no-encryption', 1);
        await this.db.open();
        await this.db.execute(`
            CREATE TABLE IF NOT EXISTS contactos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                correo TEXT,
                telefono TEXT,
                redesSociales TEXT,
                fechaIngreso TEXT
            )
        `);
    }
    async getAllContacts(): Promise<any[]> {
        return (await this.db.query('SELECT * FROM contactos')).values || [];
    }

    async addContact(name: string, links: string): Promise<void> {
        const now = new Date().toISOString();
        await this.db.run(`
            INSERT INTO contactos (nombre, correo, telefono, redesSociales, fechaIngreso)
            VALUES (?, ?, ?, ?, ?)
        `, [name, '', '', links, now]);
    }

    async deleteContact(id: number): Promise<void> {
        await this.db.run('DELETE FROM contactos WHERE id = ?', [id]);
    }  
}