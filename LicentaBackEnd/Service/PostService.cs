using LicentaBackEnd.DBContext;
using LicentaBackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace LicentaBackEnd.Service
{
    public class PostService : BaseService, IService<Post>
    {
        public PostService(AppDBContext context) : base(context)
        {
        }

        public  Post Add(Post entity)
        {
            Post post = _context.Posts.Add(entity).Entity;
            _context.SaveChanges();
            return post;
        }

        public IQueryable<Post> GetMany(Func<Post, bool>? condition = null)
        {
            if (condition == null)
            {
                return _context.Posts.AsQueryable().AsNoTracking();
            }
            return _context.Posts.Where(condition).AsQueryable().AsNoTracking();
        
        }

        public  Post GetByConition(Func<Post, bool> condition)
        {
            return _context.Posts.Where(condition).FirstOrDefault();
        }

        public  Post GetById(Guid id)
        {
            return _context.Posts.Find(id);
        }


        public Post Update(Post entity)
        {
            Post post = GetById(entity.Id);
            if (post == null)
            {
                return null;
            }
            post.Content = entity.Content;
            post.Url = entity.Url;
            _context.SaveChanges();
            return post;
        }

        public bool Delete(Guid id)
        { 
            Post post = GetById(id);
            if (post == null)
            {
                return false;
            }
            _context.Posts.Remove(post);
            _context.SaveChanges();
            return true;
        }
    }
}
