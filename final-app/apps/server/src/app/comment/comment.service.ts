import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ENotificationType } from '../notification/notification.types';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from '../prisma/prisma.extension';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { EventService } from '../event/event.service';

@Injectable()
export class CommentService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<ExtendedPrismaClient>,
    // @Inject(PRISMA_INJECTION_TOKEN) private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly eventService: EventService,
    private readonly eventEmitter: EventEmitter2,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getAllUserComments(id?: number) {
    const comments = await this.prisma.client.comment.findMany({
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
            parent: {
              select: {
                authorId: true,
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

  async getAllToEvent(id: number, eventId: number) {
    const comments = await this.prisma.client.comment.findMany({
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
    // console.log(authorId, createCommentDto);
    const newComment = await this.prisma.client.comment.create({
      data: {
        authorId: authorId,
        parentId: createCommentDto.parentId && +createCommentDto.parentId,
        eventId: +createCommentDto.eventId,
        message: createCommentDto.message,
      },
      select: {
        id: true,
        eventId: true,
        event: {
          select: {
            creatorId: true,
            id: true,
            name: true,
            creator: {
              select: {
                id: true,
                lastName: true,
              },
            },
          },
        },
        message: true,
        parentId: true,
        parent: {
          select: {
            id: true,
            message: true,
            authorId: true,
            author: {
              select: {
                id: true,
                lastName: true,
              },
            },
          },
        },
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
        authorId: true,
      },
    });

    // console.log(newComment);

    await this.eventService.clearCache('EVENTS_ID');

    this.eventEmitter.emit(ENotificationType.CreateCommentNote, newComment);

    return newComment;
  }

  async updateComment(
    id: number,
    commentId: number,
    updateCommentDto: UpdateCommentDto,
  ) {
    const _comment = await this.prisma.client.comment.findUnique({
      where: { id: commentId },
    });

    const isAuthor = _comment.authorId === id;

    if (!isAuthor) return new BadRequestException('You cannot update');

    await this.eventService.clearCache('EVENTS_ID');

    return this.prisma.client.comment.update({
      where: {
        id: commentId,
      },
      data: updateCommentDto,
    });
  }

  async deleteComment(id: number) {
    const deleteComment = await this.prisma.client.comment.delete({
      where: {
        id,
      },
    });

    this.eventEmitter.emit(ENotificationType.DeleteCommentNote, deleteComment);

    await this.eventService.clearCache('EVENTS_ID');

    return deleteComment;
  }

  async getCommentById(id: number) {
    const result = await this.prisma.client.comment.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarPath: true,
          },
        },
        parent: {
          select: {
            id: true,
            message: true,
          },
        },
        event: {
          select: {
            id: true,
            name: true,
            creator: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatarPath: true,
              },
            },
          },
        },
      },
    });

    return result;
  }
}
