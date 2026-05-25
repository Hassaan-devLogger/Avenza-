import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application, ApplicationStatus } from './application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private readonly appRepo: Repository<Application>,
  ) {}

  private generateRef(): string {
    const year = new Date().getFullYear();
    const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `CP-${year}-${rand}`;
  }

  async create(dto: CreateApplicationDto, userId: string): Promise<Application> {
    const app = this.appRepo.create({
      ...dto,
      userId,
      referenceNumber: this.generateRef(),
    });
    return this.appRepo.save(app);
  }

  async findAllForUser(userId: string): Promise<Application[]> {
    return this.appRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Application> {
    const app = await this.appRepo.findOne({ where: { id, userId } });
    if (!app) throw new NotFoundException('Application not found');
    return app;
  }

  async findAll(): Promise<Application[]> {
    return this.appRepo.find({ order: { createdAt: 'DESC' } });
  }

  async updateStatus(
    id: string,
    status: ApplicationStatus,
    adminNote?: string,
  ): Promise<Application> {
    const app = await this.appRepo.findOne({ where: { id } });
    if (!app) throw new NotFoundException('Application not found');
    app.status = status;
    if (adminNote) app.adminNote = adminNote;
    return this.appRepo.save(app);
  }

  async getStats() {
    const total = await this.appRepo.count();
    const pending = await this.appRepo.count({ where: { status: ApplicationStatus.PENDING } });
    const approved = await this.appRepo.count({ where: { status: ApplicationStatus.APPROVED } });
    const rejected = await this.appRepo.count({ where: { status: ApplicationStatus.REJECTED } });
    return { total, pending, approved, rejected };
  }
}
