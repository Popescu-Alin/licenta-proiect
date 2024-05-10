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
    }
}
