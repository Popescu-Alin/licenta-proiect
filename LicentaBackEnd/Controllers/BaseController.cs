using LicentaBackEnd.Models;
using LicentaBackEnd.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using LicentaBackEnd.DTOs;
using Microsoft.AspNetCore.Identity;
using System.Security.Authentication;
using System.Security.Claims;
using LicentaBackEnd.DBContext;
using System.Net;

namespace LicentaBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController: ControllerBase
    {
        private readonly PostService PostService;   
        private readonly UserManager<User> UserManager;
        private readonly AuthenticationService AuthenticationService;
        private readonly UserService UserService;
        private readonly CommentService CommentService;
        private readonly LikeService LikeService;
        private readonly RepositoryService RepositoryService;
        private readonly RepositoryPostService RepositoryPostService;
        private readonly UserRepositoryService UserRepositoryService;
        public BaseController(UserManager<User> userManager, AuthenticationService authenticationService, PostService postService, UserService userService, CommentService commentService, LikeService likeService, RepositoryService repositoryService, RepositoryPostService repositoryPostService, UserRepositoryService userRepositoryService)
        {
            UserManager = userManager;
            AuthenticationService = authenticationService;
            PostService = postService;
            UserService = userService;
            CommentService = commentService;
            LikeService = likeService;
            RepositoryService = repositoryService;
            RepositoryPostService = repositoryPostService;
            UserRepositoryService = userRepositoryService;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegistrationDTO body)
        {   
            if (!body.Password.Equals(body.ConfirmPassword))
            {
                return BadRequest();
            }
            try
            {
                User? user = AuthenticationService.Register(body);

                if (user == null)
                {
                    return BadRequest();
                }
                string confirmationToken = WebUtility.UrlEncode(UserManager.GenerateEmailConfirmationTokenAsync(user).Result);
                EmailService.SendEmailConfirmationMail(user.Email, confirmationToken);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
            
            return new BadRequestObjectResult("An error occurred!");
        }

        [HttpPut]
        [Route("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(string email, string token)
        {
               
            try
            {
                User user = await UserManager.FindByEmailAsync(email);
                if (user == null)
                {
                    return BadRequest();
                }
                IdentityResult result =  UserManager.ConfirmEmailAsync(user, token).Result;
                if (result.Succeeded)
                {
                    user.EmailConfirmed = true;
                    UserManager.UpdateAsync(user);
                    return Ok();
                }
                return BadRequest();
            }
            catch
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Route("resend-confirmation-email")]
        public async Task<IActionResult> ResendConfirmationEmail(string email)
        {
            try
            {
                User user = await UserManager.FindByEmailAsync(email);
                if (user == null)
                {
                    return BadRequest();
                }
                string confirmationToken = WebUtility.UrlEncode(UserManager.GenerateEmailConfirmationTokenAsync(user).Result);
                EmailService.SendEmailConfirmationMail(user.Email, confirmationToken);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<LogInTokenRepsone>> Login([FromBody] AuthDTO body)
        {
            try
            {
                return AuthenticationService.Authenticate(body.Email, body.Password);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

        }


        [Authorize]
        [HttpGet]
        [Route("posts/get-posts/{take}/{offSet}")]
        public async Task<ActionResult<IEnumerable<PostResponse>>> GetPosts(int take, int offSet)
        {
            try
            {
                List<Post> postList = PostService.GetMany().OrderByDescending(post => post.Id).Skip(offSet).Take(take).ToList();
                List<Guid> postsIds = postList.Select(post => post.Id).ToList();
                IQueryable<BasicUserInfo> users = UserService.GetMany().Select(user => new BasicUserInfo { UserId = user.Id, UserName = user.UserName });
                IQueryable<Comment> comments = CommentService.GetMany(comment => postsIds.Contains(comment.PostId));
                IQueryable<Like> likes = LikeService.GetMany(like => postsIds.Contains(like.PostId));
                List<PostResponse> postResponses = postList.Join(users, post => post.UserId, user => user.UserId, (post, user) => new PostResponse { Post = post, UserInfo = user }).ToList();
                foreach (PostResponse postResponse in postResponses)
                {
                    postResponse.NumberOfComments = comments.Where(comment => comment.PostId == postResponse.Post.Id).Count();
                    postResponse.NumberOfLikes = likes.Where(like => like.PostId == postResponse.Post.Id).Count();
                }

                
                return postResponses;
            }
            catch
            {
                return  BadRequest();
            }

        }


        [Authorize]
        [HttpPost]
        [Route("posts/add-post")]
        public async Task<ActionResult<PostResponse>> AddPost([FromBody] Post body)
        {
            string UserClaimId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            User user = await UserManager.FindByIdAsync(UserClaimId);
            if(user == null)
            {
                return BadRequest();
            }
            try
            {
                body.Id = new Guid();
                body.UserId = user.Id;
                Post post = PostService.Add(body);
                return new PostResponse
                {
                    Post = post,
                    UserInfo = new BasicUserInfo
                    {
                        UserId = user.Id,
                        UserName = user.UserName
                    },
                    NumberOfComments = 0,
                    NumberOfLikes = 0,
                };
            }
            catch
            {
                return BadRequest();
            }
        }


        [Authorize]
        [HttpDelete]
        [Route("post/delete-post/{id}")]
        public async Task<ActionResult<bool>> DeletePost(Guid id)
        {
            string UserClaimId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            User user = await UserManager.FindByIdAsync(UserClaimId);
            if (user == null)
            {
                return  BadRequest();
            }

            Post post = PostService.GetById(id);
            if (post == null || post.UserId != user.Id)
            {
                return Forbid();
            }

            try
            {
                return PostService.Delete(id);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Authorize]
        [Route("post/update-post/{id}")]
        public async Task<ActionResult<PostResponse>> UpdatePost(Guid id,[FromBody] Post body)
        {
            string UserClaimId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            User user = await UserManager.FindByIdAsync(UserClaimId);
            if (user == null)
            {
                return BadRequest();
            }

            Post post = PostService.GetById(id);
            if (post == null || post.UserId != user.Id)
            {
                return Forbid();
            }
            try
            {
                post.Content = body.Content;
                return new PostResponse
                {
                    Post = post,
                    UserInfo = new BasicUserInfo
                    {
                        UserId = user.Id,
                        UserName = user.UserName
                    },
                    NumberOfComments = 0,
                    NumberOfLikes = 0,
                };
            }
            catch
            {
                return BadRequest();
            }
        }


        [HttpPost]
        [Authorize]
        [Route("like-post/{postId}")]
        public async Task<ActionResult<bool>> LikePost(Guid postId)
        {
            string UserClaimId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            User user = await UserManager.FindByIdAsync(UserClaimId);
            if (user == null)
            {
                return BadRequest();
            }

            Post post = PostService.GetById(postId);
            if (post == null)
            {
                return BadRequest();
            }

            try
            {
                Like like = LikeService.GetByConition(like => like.PostId == postId && like.UserId == user.Id);
                if(like != null)
                {
                    return BadRequest("You already liked this post");
                }
                like =  new Like { PostId = postId, UserId = user.Id, Date = DateTime.UtcNow };
                LikeService.Add(like);
                return true;
            }
            catch
            {
                return BadRequest();
            }

        }


        [HttpDelete]
        [Authorize]
        [Route("dislike-post/{postId}")]
        public async Task<ActionResult<bool>> DislikePost(Guid postId)
        {
            string UserClaimId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            User user = await UserManager.FindByIdAsync(UserClaimId);
            if (user == null)
            {
                return BadRequest();
            }

            Post post = PostService.GetById(postId);
            if (post == null)
            {
                return BadRequest();
            }

            try
            {
                Like like = LikeService.GetByConition(like => like.PostId == postId && like.UserId == user.Id);
                if (like == null)
                {
                    return BadRequest("You already disliked this post");
                }
                LikeService.Delete(like => like.PostId == postId && like.UserId == user.Id);
                return true;
            }
            catch
            {
                return BadRequest();
            }

        }

        [Authorize]
        [HttpGet]
        [Route("comment/get-main-comments/{postId}/{take}/{offSet}")]
        public async Task<ActionResult<SlicedCollection<Comment>>> GetComments(Guid postId,int take, int offSet)
        {
            string UserClaimId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            User user = await UserManager.FindByIdAsync(UserClaimId);
            if (user == null)
            {
                return BadRequest();
            }

            try
            {
                Post post = PostService.GetById(postId);
                if (post == null)
                {
                    return BadRequest();
                }
                IQueryable<Comment> comments = CommentService.GetMany(comment => comment.PostId == postId && comment.ParentCommetId == null);

                return new SlicedCollection<Comment>()
                {
                    Collection = comments.Skip(offSet).Take(take).ToList(),
                    TotalCount = comments.Count()
                };
            }
            catch
            {
                return BadRequest();
            }

        }

        [Authorize]
        [HttpGet]
        [Route("comment/get-sub-comments/{postId}/{parentCommentId}/{take}/{offSet}")]
        public async Task<ActionResult<SlicedCollection<Comment>>> GetComments(Guid postId,Guid parentCommentId,int take, int offSet)
        {
            string UserClaimId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            User user = await UserManager.FindByIdAsync(UserClaimId);
            if (user == null)
            {
                return BadRequest();
            }

            try
            {
                Post post = PostService.GetById(postId);
                if (post == null)
                {
                    return BadRequest();
                }
                IQueryable<Comment> comments = CommentService.GetMany(comment => comment.PostId == postId && comment.ParentCommetId == parentCommentId);

                return new SlicedCollection<Comment>()
                {
                    Collection = comments.Skip(offSet).Take(take).ToList(),
                    TotalCount = comments.Count()
                };
            }
            catch
            {
                return BadRequest();
            }

        }

        [Authorize]
        [HttpPost]
        [Route("comment/add-comment/{postId}/{parentCommetId}")]
        public async Task<ActionResult<Comment>> AddComment(Guid postId, Guid? parentCommetId ,[FromBody] Comment body)
        {
            string UserClaimId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            User user = await UserManager.FindByIdAsync(UserClaimId);
            if (user == null)
            {
                return BadRequest();
            }
            try
            {
                body.Id = new Guid();
                body.UserId = user.Id;
                body.PostId = postId;
                body.ParentCommetId = parentCommetId;
                Comment comment = CommentService.Add(body);
                
                return comment;
            }
            catch
            {
                return BadRequest();
            }
        }


        [Authorize]
        [HttpDelete]
        [Route("comment/delete-comment/{id}")]
        public async Task<ActionResult<bool>> DeleteComment(Guid id)
        {
            string UserClaimId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            User user = await UserManager.FindByIdAsync(UserClaimId);
            if (user == null)
            {
                return BadRequest();
            }

            Comment comment = CommentService.GetById(id);
            if (comment == null || comment.UserId != user.Id)
            {
                return Forbid();
            }

            try
            {
                if(comment.ParentCommetId != null)
                {
                    return CommentService.Delete(id);
                }

                List<Guid> commentsId = CommentService.GetMany(comment => comment.ParentCommetId == id).Select(comm => comm.Id).ToList();
                commentsId.ForEach(id => CommentService.Delete(id));
                return CommentService.Delete(id);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Authorize]
        [Route("comment/update-comment/{id}")]
        public async Task<ActionResult<Comment>> UpdateComent(Guid id, [FromBody] Comment body)
        {
            string UserClaimId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            User user = await UserManager.FindByIdAsync(UserClaimId);
            if (user == null)
            {
                return BadRequest();
            }

            Comment comment = CommentService.GetById(id);
            if (comment == null || comment.UserId != user.Id)
            {
                return Forbid();
            }

            try
            {
                comment.Content = body.Content;
                return CommentService.Update(comment);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("repos/myRepo/{id}")]
        public async Task<ActionResult<IEnumerable<Repository>>> GetMyRepo(Guid id)
        {
            string UserClaimId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            User user = await UserManager.FindByIdAsync(UserClaimId);
            if (user == null)
            {
                return BadRequest();
            }

            try
            {
               return  RepositoryService.GetMany(repo => repo.OwnerId == user.Id).ToList();
            }
            catch
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [Authorize]
        [Route("repos/update-repo/{id}")]
        public async Task<ActionResult<Repository>> UpdateRepo(Guid id, [FromBody] Repository body)
        {
            string UserClaimId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            User user = await UserManager.FindByIdAsync(UserClaimId);
            if (user == null)
            {
                return BadRequest();
            }

            Repository repo = RepositoryService.GetById(id);
            if (repo == null || repo.OwnerId != user.Id)
            {
                return Forbid();
            }

            try
            {
                repo.Title = body.Title;
                repo.AccessModifier = body.AccessModifier;
                return RepositoryService.Update(repo);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize]
        [Route("repos/add-repo")]
        public async Task<ActionResult<Repository>> AddRepo([FromBody] Repository body)
        {
            string UserClaimId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            User user = await UserManager.FindByIdAsync(UserClaimId);
            if (user == null)
            {
                return BadRequest();
            }
            try
            {
                body.Id = new Guid();
                body.OwnerId = user.Id;
                Repository repo = RepositoryService.Add(body);
                return repo;
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        [Authorize]
        [Route("repos/delete-repo/{id}")]
        public async Task<ActionResult<bool>> DeleteRepo(Guid id)
        {
            string UserClaimId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            User user = await UserManager.FindByIdAsync(UserClaimId);
            if (user == null)
            {
                return BadRequest();
            }

            Repository repo = RepositoryService.GetById(id);
            if (repo == null || repo.OwnerId != user.Id)
            {
                return Forbid();
            }

            try
            {
                RepositoryPostService.DeleteMany(repoPost => repoPost.RepositoryId == id);
                UserRepositoryService.DeleteMany(userRepo => userRepo.RepositoryId == id);
                return UserService.Delete(id);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize]
        [Route("repos/add-post-to-repo/{repoId}/{postId}")]
        public async Task<ActionResult<bool>> AddPostToRepo(Guid repoId, Guid postId)
        {
            string UserClaimId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            User user = await UserManager.FindByIdAsync(UserClaimId);
            if (user == null)
            {
                return BadRequest();
            }

            Repository repo = RepositoryService.GetById(repoId);
            if (repo == null || repo.OwnerId != user.Id)
            {
                return Forbid();
            }

            Post post = PostService.GetById(postId);
            if (post == null)
            {
                return BadRequest();
            }

            try
            {
                RepositoryPost repoPost = new RepositoryPost { RepositoryId = repoId, PostId = postId };
                RepositoryPostService.Add(repoPost);
                return true;
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        [Authorize]
        [Route("repos/remove-post-from-repo/{repoId}/{postId}")]
        public async Task<ActionResult<bool>> RemovePostFromRepo(Guid repoId, Guid postId)
        {
            string UserClaimId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            User user = await UserManager.FindByIdAsync(UserClaimId);
            if (user == null)
            {
                return BadRequest();
            }

            Repository repo = RepositoryService.GetById(repoId);
            if (repo == null || repo.OwnerId != user.Id)
            {
                return Forbid();
            }

            Post post = PostService.GetById(postId);
            if (post == null)
            {
                return BadRequest();
            }

            try
            {
                RepositoryPost repoPost = RepositoryPostService.GetByConition(repoPost => repoPost.RepositoryId == repoId && repoPost.PostId == postId);
                if(repoPost == null)
                {
                    return BadRequest();
                }
                RepositoryPostService.Delete(repoPost => repoPost.RepositoryId == repoId && repoPost.PostId == postId);
                return true;
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("/email/{email}")]
        public void SendEmail(string email) {

            EmailService.SendEmailConfirmationMail(email," ");
        }
    
        //[Authorize]
        //public async override Task<UserDTO> Profile()
        //{
        //    var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
        //    User user = await _userManager.FindByIdAsync(userId);
        //    return new UserDTO
        //    {
        //        Email = user.Email,
        //        UserName = user.UserName,
        //        Id = user.Id.ToString()
        //    };

        //}
    }
}
