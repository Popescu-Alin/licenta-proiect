using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using LicentaBackEnd.Models;

namespace LicentaBackEnd.DBContext
{
    public class AppDBContext : IdentityDbContext<User, Role, Guid,
                IdentityUserClaim<Guid>, UserRole, IdentityUserLogin<Guid>,
                IdentityRoleClaim<Guid>, IdentityUserToken<Guid>>
    {
        public AppDBContext(DbContextOptions<AppDBContext> options)
        : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        public DbSet<User> Users { get; set; }
        public  DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Repository> Repositories { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<RepositoryPost> RepositoryPosts { get; set; }
        public DbSet<UserRepository> UserRepositories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Like>().HasKey(like => new { like.UserId,like.PostId });
            modelBuilder.Entity<UserRepository>().HasKey(userRepository => new { userRepository.UserId, userRepository.RepositoryId });
            modelBuilder.Entity<RepositoryPost>().HasKey(repositoryPost => new { repositoryPost.RepositoryId, repositoryPost.PostId });
        }

    }   
}
