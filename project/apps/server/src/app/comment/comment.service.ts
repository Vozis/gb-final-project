import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PRISMA_INJECTION_TOKEN } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class CommentService {
  constructor(
    @Inject(PRISMA_INJECTION_TOKEN) private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async getAllUserComments(id?: number) {
    const comments = await this.prisma.comment.findMany({
      where: {
        event: {
          users: {
            some: {
              id,
            },
          },
        },
        parentId: null,
      },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            userName: true,
            avatarPath: true,
            role: true,
            exitDate: true,
          },
        },
        likes: true,
        _count: {
          select: {
            likes: true,
            children: true,
          },
        },
        children: {
          include: {
            author: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                userName: true,
                avatarPath: true,
                role: true,
                exitDate: true,
              },
            },
            likes: true,
            _count: {
              select: {
                likes: true,
                children: true,
              },
            },
            children: {
              include: {
                author: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    userName: true,
                    avatarPath: true,
                    role: true,
                    exitDate: true,
                  },
                },
                likes: true,
                _count: {
                  select: {
                    likes: true,
                    children: true,
                  },
                },
                children: {
                  include: {
                    author: {
                      select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        userName: true,
                        avatarPath: true,
                        role: true,
                        exitDate: true,
                      },
                    },
                    likes: true,
                    _count: {
                      select: {
                        likes: true,
                        children: true,
                      },
                    },
                    children: true,
                  },
                },
              },
            },
          },
        },
      },
      // select: {
      //   id: true,
      //   eventId: true,
      //   message: true,
      //   parentId: true,
      //   _count: true,
      //   children: true,
      //   createdAt: true,
      //   updatedAt: true,
      //   isLiked: true,
      //   likes: {
      //     select: {
      //       commentId: true,
      //       userId: true,
      //       userId_commentId: true,
      //     },
      //   },
      //   author: {
      //     select: {
      //       id: true,
      //       userName: true,
      //       firstName: true,
      //       lastName: true,
      //       avatarPath: true,
      //     },
      //   },
      // },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (id) {
      return comments.map(comment => {
        comment.isLiked = !!comment.likes.some(
          like => like.userId_commentId === `${id}_${comment.id}`,
        );
        return comment;
      });
    }

    return comments;
  }

  async getUnreadComments(id: number) {
    const comments = await this.prisma.comment.findMany({
      where: {
        createdAt: {
          gt: new Date(),
        },
        parentId: null,
      },
      select: {
        id: true,
        eventId: true,
        message: true,
        parentId: true,
        _count: true,
        children: true,
        createdAt: true,
        updatedAt: true,
        isLiked: true,
        likes: {
          select: {
            commentId: true,
            userId: true,
            userId_commentId: true,
          },
        },
        author: {
          select: {
            id: true,
            userName: true,
            firstName: true,
            lastName: true,
            avatarPath: true,
          },
        },
      },
    });

    return comments.map(comment => {
      comment.isLiked = !!comment.likes.some(
        like => like.userId_commentId === `${id}_${comment.id}`,
      );
      return comment;
    });
  }

  async getAllToEvent(id: number, eventId: number) {
    const comments = await this.prisma.comment.findMany({
      where: {
        eventId,
      },
      include: {
        author: {
          select: {
            id: true,
            userName: true,
            firstName: true,
            lastName: true,
            avatarPath: true,
          },
        },
        likes: true,
        _count: {
          select: {
            likes: true,
            children: true,
          },
        },
        children: {
          include: {
            author: {
              select: {
                id: true,
                userName: true,
                firstName: true,
                lastName: true,
                avatarPath: true,
              },
            },
            likes: true,
            _count: {
              select: {
                likes: true,
                children: true,
              },
            },
            children: {
              include: {
                author: {
                  select: {
                    id: true,
                    userName: true,
                    firstName: true,
                    lastName: true,
                    avatarPath: true,
                  },
                },
                likes: true,
                _count: {
                  select: {
                    likes: true,
                    children: true,
                  },
                },
                children: {
                  include: {
                    author: {
                      select: {
                        id: true,
                        userName: true,
                        firstName: true,
                        lastName: true,
                        avatarPath: true,
                      },
                    },
                    likes: true,
                    _count: {
                      select: {
                        likes: true,
                        children: true,
                      },
                    },
                    children: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (id) {
      return comments.map(comment => {
        comment.isLiked = !!comment.likes.some(
          like => like.userId_commentId === `${id}_${comment.id}`,
        );
        return comment;
      });
    }

    return comments;
  }

  async createComment(authorId: number, createCommentDto: CreateCommentDto) {
    return this.prisma.comment.create({
      data: {
        authorId: authorId,
        parentId: createCommentDto.parentId && +createCommentDto.parentId,
        eventId: +createCommentDto.eventId,
        message: createCommentDto.message,
      },
      select: {
        id: true,
        eventId: true,
        message: true,
        parentId: true,
        _count: true,
        children: true,
        createdAt: true,
        updatedAt: true,
        isLiked: true,
        likes: {
          select: {
            commentId: true,
            userId: true,
            userId_commentId: true,
          },
        },
        author: {
          select: {
            id: true,
            userName: true,
            firstName: true,
            lastName: true,
            avatarPath: true,
          },
        },
      },
    });
  }

  async updateComment(
    id: number,
    commentId: number,
    updateCommentDto: UpdateCommentDto,
  ) {
    const _comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    const isAuthor = _comment.authorId === id;

    if (!isAuthor) return new BadRequestException('You cannot update');

    return this.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: updateCommentDto,
    });
  }

  async deleteComment(id: number) {
    return this.prisma.comment.delete({
      where: {
        id,
      },
    });
  }
}
