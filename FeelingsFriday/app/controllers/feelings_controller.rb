class FeelingsController < ApplicationController
    def index
        feelings = Feeling.all
        users = User.all
        render json: feelings
    end

    def new
        feeling = Feeling.new

    end

    def create
        # byebug
        feeling = Feeling.new(feeling_params)

        feeling.save
        render json: feeling
    end


    # def updateLike
    #   feeling = feeling.find(params[:id])
    #
    # end

    def update
      feeling = Feeling.find(params[:id])
      feeling.update(feeling_params)
      render json: feeling
    end

    def feeling_params
        params.require(:feeling).permit(:content, :likes, :user_id)
    end
end
