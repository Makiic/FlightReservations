using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FlightReservations.Migrations
{
    /// <inheritdoc />
    public partial class Migracija : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VisitorId",
                table: "Reservations");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "VisitorId",
                table: "Reservations",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
