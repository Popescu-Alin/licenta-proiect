using LicentaBackEnd.DBContext;
using LicentaBackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace LicentaBackEnd.Service
{
    public class UserRepositoryService : BaseService, IAssociativeService<UserRepository>
    {
        public UserRepositoryService(AppDBContext context) : base(context)
        {
        }

        public UserRepository Add(UserRepository entity)
        {
            UserRepository userRepository = _context.UserRepositories.Add(entity).Entity;
            _context.SaveChanges();
            return userRepository;
        }

        public bool Delete(Func<UserRepository, bool> condition)
        {
            UserRepository entity = GetByConition(condition);
            if (entity == null)
            {
                return false;
            }
            _context.UserRepositories.Remove(entity);
            _context.SaveChanges();
            return true;
        }

        public bool DeleteMany(Func<UserRepository, bool> condition)
        {
            var repoUser = GetMany(condition);
            if (repoUser == null)
            {
                return false;
            }
            _context.UserRepositories.RemoveRange(repoUser);
            _context.SaveChanges();
            return true;
        }

        public UserRepository GetByConition(Func<UserRepository, bool> condition)
        {
            return _context.UserRepositories.Find(condition);
        }

        public IQueryable<UserRepository> GetMany(Func<UserRepository, bool>? condition)
        {
            if(condition == null)
            {
                return _context.UserRepositories.AsQueryable().AsNoTracking();  
            }
            return _context.UserRepositories.Where(condition).AsQueryable().AsNoTracking();
        }

        public UserRepository Update(UserRepository entity)
        {
            UserRepository repositoryPost = GetByConition(userRepository => userRepository.UserId == entity.UserId && userRepository.RepositoryId == entity.RepositoryId);
            if(repositoryPost == null) {
                return null;
            }
            repositoryPost.Privileges = entity.Privileges;
            _context.SaveChanges();
            return repositoryPost;
        }
    }
}
