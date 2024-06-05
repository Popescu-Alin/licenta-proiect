using LicentaBackEnd.DBContext;
using LicentaBackEnd.DTOs;
using LicentaBackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace LicentaBackEnd.Service
{
    public class CommentService : BaseService, IService<Comment>
    {
        public CommentService(AppDBContext context) : base(context)
        {
        }

        public Comment Add(Comment entity)
        {
            Comment comment = _context.Add(entity).Entity;
            _context.SaveChanges();
            return comment;
        }

        public bool Delete(Guid id)
        {
            Comment comment = GetById(id);
            if (comment == null)
            {
                return false;
            }
            _context.Remove(comment);
            _context.SaveChanges();
            return true;
        }

        public Comment GetByConition(Func<Comment, bool> condition = null)
        {
            return _context.Comments.Find(condition);
        }

        public Comment GetById(Guid id)
        {
            return _context.Comments.Find(id);
        }

        public IQueryable<Comment> GetMany(Func<Comment, bool>? condition)
        {
            if (condition == null)
            {
                return _context.Comments.AsQueryable().AsNoTracking();
            }
            else
            {
                return _context.Comments.Where(condition).AsQueryable().AsNoTracking();
            }
        }

        public Comment Update(Comment entity)
        {
            Comment comment = GetById(entity.Id);
            comment.Content = entity.Content;
            _context.SaveChanges();
            return comment;
        }

        public IQueryable<CommentWithSubComments> GetManyCommentsWithSubComments(Func<Comment, bool>? condition = null)
        {
            IQueryable<Comment> comments = _context.Comments.AsQueryable().AsNoTracking().Where(comment => comment.ParentCommetId != null);
            if (condition != null)
            {
                 _context.Comments.AsQueryable().AsNoTracking().Where(condition);
            }
            
            IQueryable<CommentWithSubComments> commentsWithSubComments = comments.Select(comment => new CommentWithSubComments
            {
                Comment = comment,
                SubComments = _context.Comments.AsQueryable().AsNoTracking().Where(subComment => subComment.ParentCommetId == comment.Id)
            });

            return commentsWithSubComments;

        }

        public IQueryable<CommentResponse> GetManyCommnetResponses(Func<Comment, bool>? condition)
        {
            IQueryable<Comment> comments = _context.Comments;
            if (condition != null)
            {
                comments = comments.Where(condition).AsQueryable();
            }

            IQueryable<CommentResponse> commentResponses = comments.Join(_context.Users, c => c.UserId, u => u.Id,
                                            (c, u) => new CommentResponse
                                            {
                                                Comment = c,
                                                UserInfo = new BasicUserInfo()
                                                {
                                                    UserId = u.Id,
                                                    UserName = u.FirstName,
                                                    ImageURL = u.ProfilePicture
                                                }
                                            });
            return commentResponses;
                    
        }
        
        public List<MainCommentResponse> GetMainCommentRepsonses(Func<Comment, bool> condition, int take, int skip)
        {
            List<Comment> comments = _context.Comments.Where(condition).Skip(skip).Take(take).OrderByDescending(c => c.Id).ToList();
            
            if(comments.Count == 0)
            {
                return new List<MainCommentResponse>();
            }

            List<MainCommentResponse> mainCommentRepsonses = comments.Join(_context.Users, c => c.UserId, u => u.Id,
                                                           (c, u) => new MainCommentResponse
                                                           {
                                                Comment = c,
                                                UserInfo = new BasicUserInfo()
                                                {
                                                    UserId = u.Id,
                                                    UserName = u.FirstName,
                                                    ImageURL = u.ProfilePicture
                                                },
                                                SubcommentsNumber = _context.Comments.Where(subComment => subComment.ParentCommetId == c.Id).Count()
                                            }).ToList();
            return mainCommentRepsonses;
        }   
    }
}
