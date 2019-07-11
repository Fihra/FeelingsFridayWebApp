class User < ApplicationRecord
    has_many :feelings
    has_many :comments

    validates :name, presence: true
end