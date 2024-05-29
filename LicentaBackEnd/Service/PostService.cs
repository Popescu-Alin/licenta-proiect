using LicentaBackEnd.DBContext;
using LicentaBackEnd.DTOs;
using LicentaBackEnd.Models;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;

namespace LicentaBackEnd.Service
{
    public class PostService : BaseService, IService<Post>
    {
        readonly UserService UserService;
        readonly CommentService CommentService;
        readonly LikeService LikeService;
        readonly RepositoryPostService RepositoryPostService;
        readonly UserRepositoryService UserRepositoryService;
        public PostService(AppDBContext context, UserService userService, CommentService commentService, LikeService likeService, RepositoryPostService repositoryPostService, UserRepositoryService userRepositoryService) : base(context)
        {
            UserService = userService;
            CommentService = commentService;
            LikeService = likeService;
            RepositoryPostService = repositoryPostService;
            UserRepositoryService = userRepositoryService;
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

        public List<PostResponse> getPostResponses(Func<Post, bool> condition,int take, int offset, Guid userIdOfTheCaller) {
            List<Post> posts  = GetMany(condition).OrderByDescending(entity => entity.Id).Skip(offset).Take(take).ToList();

            if(posts.Count() == 0) { 
                return new  List<PostResponse>();
            }

            List<PostResponse> postResponses = posts.Join(_context.Users, post => post.UserId, user => user.Id, (post, user) => new PostResponse
            {
                Post = post,
                UserInfo = new BasicUserInfo { UserId = user.Id, UserName = user.UserName, ImageURL = user.ProfilePicture}
            }).ToList();

            IQueryable<Guid> userReposGuids = UserRepositoryService.GetMany(entity => entity.UserId == userIdOfTheCaller).Select(entity => entity.RepositoryId);
            IQueryable<RepositoryPost> repoPosts = RepositoryPostService.GetMany(entity => userReposGuids.Contains(entity.RepositoryId));

            foreach (var postResponse in postResponses) {
                postResponse.NumberOfComments = CommentService.GetMany(comment => comment.PostId == postResponse.Post.Id).Count();
                postResponse.NumberOfLikes = LikeService.GetMany(like => like.PostId == postResponse.Post.Id).Count();
                postResponse.IsLiked = LikeService.GetMany(like => like.PostId == postResponse.Post.Id && like.UserId == userIdOfTheCaller).Count() > 0;
                postResponse.IsSaved = repoPosts.Where(entity => entity.PostId == postResponse.Post.Id).Count() > 0;
            }

            return postResponses;

        }

        public PostResponse? getPostResponse(Guid postId, Guid userIdOfTheCaller)
        {
            Post post = GetById(postId);
            if (post == null)
            {
                return null;
            }
            User user = UserService.GetById(post.UserId);
            if (user == null)
            {
                return null;
            }
            PostResponse postResponse = new PostResponse
            {
                Post = post,
                UserInfo = new BasicUserInfo { UserId = user.Id, UserName = user.UserName, ImageURL = user.ProfilePicture}
            };
            postResponse.NumberOfComments = CommentService.GetMany(comment => comment.PostId == postResponse.Post.Id).Count();
            postResponse.NumberOfLikes = LikeService.GetMany(like => like.PostId == postResponse.Post.Id).Count();
            postResponse.IsLiked = LikeService.GetMany(like => like.PostId == postResponse.Post.Id && like.UserId == userIdOfTheCaller).Count() > 0;
            postResponse.IsSaved = RepositoryPostService.GetMany(entity => entity.PostId == postResponse.Post.Id).Count() > 0;
            return postResponse;
        }
    }
}
