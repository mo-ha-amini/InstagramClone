﻿using Models.DTO.Request;
using Models;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using Models.Entities;
using Models.DTO.Response;
using Newtonsoft.Json;

namespace Repository
{
    public class PostRepository : IPostRepository
    {
        private readonly IDatabaseConnection _databaseConnection;
        public PostRepository(IDatabaseConnection databaseConnection)
        {
            _databaseConnection = databaseConnection;
        }
        public async Task<CustomActionResult> CreatePost(CreatePostRequest model)
        {
            CustomActionResult result = new CustomActionResult();
            try
            {
                CustomActionResult<IDbConnection> connection = await _databaseConnection.GetConnection();
                result.IsSuccess = connection.IsSuccess;
                result.Message = connection.Message;
                if (!result.IsSuccess) return result;

                byte[] mediaData;
                using (var memoryStream = new MemoryStream())
                {
                    await model.MediaFile.CopyToAsync(memoryStream);
                    mediaData = memoryStream.ToArray();
                }

                string command = @"prc_create_post";
                DynamicParameters parameters = new DynamicParameters();
                //parameters.Add("@Id", model.Id);
                parameters.Add("@UserId", model.UserId);
                parameters.Add("@Caption", model.Caption);
                parameters.Add("@Media", mediaData);

                await connection.Data.ExecuteAsync(command, parameters, commandType: CommandType.StoredProcedure);
                result.IsSuccess = true;
                result.Message = result.Message;

            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
                result.IsSuccess = false;
                result.Message = "create Post failed";
            }
            return result;
        }

        public async Task<CustomActionResult<List<getFeedPostResponse>>> GetFeedPosts(int userId)
        {
            CustomActionResult<List<getFeedPostResponse>> result = new CustomActionResult<List<getFeedPostResponse>>();
            try
            {
                CustomActionResult<IDbConnection> connection = await _databaseConnection.GetConnection();
                result.IsSuccess = connection.IsSuccess;
                result.Message = connection.Message;
                if (!result.IsSuccess) return result;

                string command = "prc_get_feed_posts";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", userId);

                var posts = await connection.Data.QueryAsync<getFeedPostResponse>(command, parameters, commandType: CommandType.StoredProcedure);
                foreach (var post in posts)
                {
                    post.Likes = post.LikesJson != null ? JsonConvert.DeserializeObject<List<Like>>(post.LikesJson) : new List<Like>();
                    post.Comments = post.CommentsJson != null ? JsonConvert.DeserializeObject<List<Comment>>(post.CommentsJson) : new List<Comment>();
                }

                result.Data = posts.ToList();
                result.IsSuccess = true;
                result.Message = "Feed Posts retrieved successfully.";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                result.IsSuccess = false;
                result.Message = "Failed to retrieve Feed posts.";
            }
            return result;
        }

        public async Task<CustomActionResult<List<Post>>> GetPostByUserId(int id)
        {
            CustomActionResult<List<Post>> result = new CustomActionResult<List<Post>>();
            try
            {
                CustomActionResult<IDbConnection> connection = await _databaseConnection.GetConnection();
                result.IsSuccess = connection.IsSuccess;
                result.Message = connection.Message;
                if (!result.IsSuccess) return result;

                string command = "prc_get_posts_by_user";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", id);

                var posts = await connection.Data.QueryAsync<Post>(command, parameters, commandType: CommandType.StoredProcedure);
                result.Data = posts.ToList();
                result.IsSuccess = true;
                result.Message = "Posts retrieved successfully.";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                result.IsSuccess = false;
                result.Message = "Failed to retrieve posts.";
            }
            return result;
        }

        public async Task<CustomActionResult> likePost(int UserId, int PostId)
        {
            CustomActionResult result = new CustomActionResult();

            try
            {
                CustomActionResult<IDbConnection> connection = await _databaseConnection.GetConnection();
                result.IsSuccess = connection.IsSuccess;
                result.Message = connection.Message;

                if (!result.IsSuccess) return result;

                string command = @"prc_like_post";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", UserId);
                parameters.Add("@PostId", PostId);

                await connection.Data.ExecuteAsync(command, parameters, commandType: CommandType.StoredProcedure);

                result.IsSuccess = true;
                result.Message = "Like Success";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                result.IsSuccess = false;
                result.Message = "Failed to Like post";
            }

            return result;
        }
    }
}
