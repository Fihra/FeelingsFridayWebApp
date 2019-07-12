class CommentsController < ApplicationController

  def index
      feelings = Feeling.all
      comments = Comment.all
      render json: comments
  end

  def new
      comment = Comment.new

  end

  def create
      # byebug
      feeling = Comment.new(comments_params)

      comment.save
      render json: comment
  end

  def update
    feeling = Feeling.find(params[:id])
    feeling.update(feeling_params)
    render json: feeling
  end

  def comment_params
      params.require(:comment).permit(:comment, :feeling_id)
  end
end
