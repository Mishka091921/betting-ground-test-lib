import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { StrapiBaseService } from './services/strapi-base.service';
import { StrapiMemberService } from './services/member/strapi-member.service';
import { StrapiMemberBoardService } from './services/board/strapi-member-board.service';
import { StrapiCommentsService } from './services/comments/strapi-member-comments.service';
import { StrapiMemberReactionService } from './services/reaction/strapi-member-reaction.service';

@Module({
  imports: [
    HttpModule,
  ],
  controllers:[],
  providers: [
    StrapiBaseService,
    StrapiMemberService,
    StrapiMemberBoardService,
    StrapiCommentsService,
    StrapiMemberReactionService,
  ],
  exports: [
    StrapiBaseService,
    StrapiMemberService,
    StrapiMemberBoardService,
    StrapiCommentsService,
    StrapiMemberReactionService,
  ],
})
export class StrapiGatewayModule {}
