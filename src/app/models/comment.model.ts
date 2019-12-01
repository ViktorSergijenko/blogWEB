import { BaseEntity } from './base-entity.model';
import { Post } from './post.model';
import { User } from './user.model';

export class Comment extends BaseEntity {
    postId: string;
    post: Post;
    text: string;
    userId: string;
    user: User;
    commentedAt: string;
    wasModified: boolean;
}