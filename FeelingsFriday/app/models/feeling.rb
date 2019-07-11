class Feeling < ApplicationRecord
    belongs_to :user
    has_many :comments

    validates :content, length: {minimum: 3}
end
