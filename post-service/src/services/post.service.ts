import { Post } from '../database/entity/Posts.entity';
import { User } from '../database/entity/User.entity';
import { DatabaseException } from '../exceptions';
import { ICreatePost } from '../interfaces';

class PostService {
  async createPost(data: ICreatePost, userId: number) {
    const user: any = await User.findOne({
      where: {
        id: userId,
      },
      relations: {
        userProfile: true,
      },
    });

    if (!data.title || !data.description) {
      throw new DatabaseException(null, 'Title or description is empty');
    }

    await Post.createQueryBuilder()
      .insert()
      .into(Post)
      .values([{ ...data, user: user }])
      .execute();
    return true;
  }

  async getAllPost() {
    const allPosts = await Post.find({});
    if (allPosts.length === 0) {
      throw new DatabaseException(null, 'Post is Empty');
    }
    return allPosts;
  }

  async getPostById(userId: number) {
    const user: any = await User.findOne({
      where: {
        id: userId,
      },
      relations: {
        posts: true,
      },
    });

    const checkUserPost = user?.posts.length > 0 ? user?.posts : [];
    if (checkUserPost?.length === 0) {
      throw new DatabaseException(null, 'User does not have post anything');
    }

    const userPost = [];
    for (const post of checkUserPost) {
      const postPayload = {
        post_id: post.id,
        post_title: post.title,
        post_description: post.description,
        post_photo: post.photo ? post.photo : 'No Image',
        post_likes: post.likes,
        post_created_at: post.created_at,
      };
      userPost.push(postPayload);
    }

    return userPost;
  }

  async filterPost(title: string) {
    const findPost = await Post.findOne({
      where: {
        title: title,
      },
    });

    if (!findPost) {
      throw new DatabaseException(null, 'Post does not exists');
    }
    return findPost;
  }
}

export default new PostService();
