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
                };
            }
            if (!_userManager.CheckPasswordAsync(userEntity,password).Result)
            {
                return new LogInTokenRepsone()
                {
                    ConfirmedEmail = false,
                    Token = null,
                };
            }
            IEnumerable<string> roles = _userManager.GetRolesAsync(userEntity).Result;
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = JwtTokenGenerator.GenerateJwtToken(userEntity, roles);
            return new LogInTokenRepsone()
            {
                ConfirmedEmail = userEntity.EmailConfirmed,
                Token = tokenHandler.WriteToken(token),
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
                EmailConfirmationToken = Guid.NewGuid().ToString(),
                EmailConfirmed = false,
                ExpirationDateEmailConfirmationToken = DateTime.UtcNow.AddHours(24),
                ForgottenPasswordToken = "",
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
