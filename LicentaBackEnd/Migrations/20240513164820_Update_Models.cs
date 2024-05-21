using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LicentaBackEnd.Migrations
{
    public partial class Update_Models : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmailConfirmationToken",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ExpirationDateEmailConfirmationToken",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ExpirationDateForgottenPasswordToken",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "ForgottenPasswordToken",
                table: "AspNetUsers",
                newName: "Description");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "AspNetUsers",
                newName: "ForgottenPasswordToken");

            migrationBuilder.AddColumn<string>(
                name: "EmailConfirmationToken",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "ExpirationDateEmailConfirmationToken",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "ExpirationDateForgottenPasswordToken",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
