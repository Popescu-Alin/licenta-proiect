namespace LicentaBackEnd.Models
{
    public class Like
    {

        public Guid PostId { get; set; }
        public Guid UserId { get; set;}
        public DateTime Date {  get; set; }
    }
}
