// strapi-gateway.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { StrapiBaseService } from '../strapi-base.service';

@Injectable()
export class StrapiMemberService extends StrapiBaseService {
  constructor(
    http: HttpService,
  ) {
    super(http);
  }

  async memberCreate(data: any):Promise<any> {
    // return this.post('members', data);
  }
  
}
