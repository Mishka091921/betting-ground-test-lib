// strapi-gateway.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { StrapiBaseService } from '../strapi-base.service';

@Injectable()
export class StrapiMemberReactionService extends StrapiBaseService {
  constructor(
    http: HttpService,
  ) {
    super(http);
  }

  async memberReactionCreate(data: any):Promise<{reaction: string}> {
    return await this.post('reactions/add-reaction', data);
  }

  async getMyReaction(document_id: any, member_idx: any):Promise<any> {
      const url = new URL(`${process.env.STRAPI_URL}/api/reactions`);
      url.searchParams.append('filters[member_idx][$eq]', member_idx.toString());
      url.searchParams.append('filters[parent_document_id][$eq]', document_id);
      return await this.get(url.toString());
  }
}
