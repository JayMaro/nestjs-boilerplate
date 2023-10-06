import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @Column({ name: 'use_flag' })
  useFlag: boolean = true;
  @CreateDateColumn({ name: 'reg_datetime' })
  regDatetime: Date = new Date();
  @UpdateDateColumn({ name: 'update_datetime' })
  updateDatetime: Date = new Date();
  @Column({ name: 'reg_admin_seq' })
  regAdminSeq: number;
  @Column({ name: 'update_admin_seq' })
  updateAdminSeq: number;
}
