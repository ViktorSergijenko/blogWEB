import { BaseEntity } from './base-entity.model';
import { Post } from './post.model';
import { Like } from './like.model';
import { Comment } from './comment.model';

export class User extends BaseEntity {
    fullName: string;
    userName: string;
    firstName: string;
    lastName: string;
    age: string;
    country: string;
    city: string;
    languageId: string;
    registeredAt: Date;
    avatarImageBase64: string;
    posts: Post[];
    likes: Like[];
    email: string;
    password: string;
    comments: Comment[];
}