import { BaseEntity } from './base-entity.model';
import { Post } from './post.model';
import { User } from './user.model';

export class Like extends BaseEntity {
    postId: string;
    post: Post;
    userId: string;
    user: User;
}