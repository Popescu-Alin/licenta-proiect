namespace LicentaBackEnd.DBContext
{
    public class LogInTokenRepsone
    {
        public string? Token { get; set; }
        public bool ConfirmedEmail { get; set; }
        public string UserName { get; set; }
        public string ImageURL { get; set; }
        public string UserId { get; set;}

    }
}
