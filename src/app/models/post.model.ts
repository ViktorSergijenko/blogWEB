import { BaseEntity } from './base-entity.model';
import { Like } from './like.model';
import { User } from './user.model';

export class Post extends BaseEntity {
    title: string;
    authorFullName: string;
    text: string;
    userId: string;
    postedAt: Date;
    imageBase64: string;
    likes: Like[];
    comments: Comment[];
    user: User;
}