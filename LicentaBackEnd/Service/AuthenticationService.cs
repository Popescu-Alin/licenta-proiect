using LicentaBackEnd.Constants;
using LicentaBackEnd.DBContext;
using LicentaBackEnd.DTOs;
using LicentaBackEnd.Helpers;
using LicentaBackEnd.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace LicentaBackEnd.Service
{

    public class AuthenticationService
    {
        private readonly UserManager<User> _userManager;

        public AuthenticationService(UserManager<User> userManager)
        {
            _userManager = userManager;
        }   

        public  LogInTokenRepsone Authenticate( string email, string password)
        {
            User userEntity =  _userManager.FindByEmailAsync(email).Result;
            if (userEntity == null)
            {
                return new LogInTokenRepsone() {
                    ConfirmedEmail = false,
                    Token = null,
                    ImageURL = "",
                    UserName = "",
                    UserId = "",
                };
            }
            if (!_userManager.CheckPasswordAsync(userEntity,password).Result)
            {
                return new LogInTokenRepsone()
                {
                    ConfirmedEmail = false,
                    Token = null,
                    ImageURL = "",
                    UserName ="",
                    UserId = "",
                };
            }
            IEnumerable<string> roles = _userManager.GetRolesAsync(userEntity).Result;
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = JwtTokenGenerator.GenerateJwtToken(userEntity, roles);
            return new LogInTokenRepsone()
            {
                ConfirmedEmail = userEntity.EmailConfirmed,
                Token = tokenHandler.WriteToken(token),
                ImageURL = userEntity.ProfilePicture,
                UserName = userEntity.UserName,
                UserId = userEntity.Id.ToString(),
            };    
        }
    
        public User? Register(RegistrationDTO entity)
        {
            var userEmailExists = _userManager.FindByEmailAsync(entity.Email).Result;
            if (userEmailExists != null)
            {
                return null;
            }

            User user = new User
            {
                Email = entity.Email,
                UserName = entity.UserName,
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                EmailConfirmed = false,
                ProfilePicture = ""
            };
            IdentityResult result = _userManager.CreateAsync(user, entity.Password).Result;
            result = _userManager.AddToRoleAsync(user, UserTypes.User).Result;
            if (result.Succeeded)
            {
                return user;
            }

            return null;
        }
    }
}
