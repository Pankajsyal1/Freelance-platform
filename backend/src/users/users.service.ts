import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users: any[] = [];
  private idSeq = 1;

  async create(data: any) {
    const user = { id: this.idSeq++, ...data, createdAt: new Date().toISOString() };
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string) { return this.users.find((u) => u.email === email); }
  me(id: number) { return this.users.find((u) => u.id === id); }
}
