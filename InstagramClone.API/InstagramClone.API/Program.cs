
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Models;
using Repository;
using Repository.Interface;
using Service;
using Service.Interface;
using System.Text;

namespace InstagramClone.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            ConfigurationManager configuration = builder.Configuration;
            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddSwaggerGen(swagger =>
            {
                swagger.SwaggerDoc("Version1", new OpenApiInfo { Title = "API", Version = "Version1" });
                swagger.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 12345abcdef\"",
                });
                string filePath = Path.Combine(System.AppContext.BaseDirectory, "Panel.API.xml");
                swagger.IncludeXmlComments(filePath);
                swagger.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                          new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                }
                            },
                            new string[] {}

                    }
                });
            });


            builder.Services.AddOptions();

            builder.Services.Configure<DatabaseConnectionModel>(configuration.GetSection("DatabaseSetting"));
            builder.Services.Configure<JwtConfigModel>(configuration.GetSection("JWT"));

            builder.Services.AddSingleton<IDatabaseConnection, DatabaseConnection>();


            #region repository
            builder.Services.AddSingleton<IUserRepository, UserRepository>();
            builder.Services.AddSingleton<IPostRepository, PostRepository>();
            builder.Services.AddSingleton<ICommentRepository, CommentRepository>();

            #endregion


            #region Service
            builder.Services.AddSingleton<IUserService, UserService>();
            builder.Services.AddSingleton<IPostService, PostService>();
            builder.Services.AddSingleton<ICommentService, CommentService>();

            #endregion

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(
                options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("JWT:Key").Value)),
                        ClockSkew = TimeSpan.Zero
                    };
                });

            // Add CORS services
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowLocalhost",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:5173")
                              .AllowAnyMethod()
                              .AllowAnyHeader();
                    });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                #region Swagger
                app.UseSwagger();
                app.UseSwaggerUI(u =>
                {
                    u.SwaggerEndpoint("/swagger/Version1/swagger.json", "Version1");
                });
                #endregion
            }

            app.UseHttpsRedirection();

            // Use the CORS policy
            app.UseCors("AllowLocalhost");

            app.UseAuthorization();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
