class CreateFeelings < ActiveRecord::Migration[5.2]
  def change
    create_table :feelings do |t|
      t.string :content
      t.integer :likes
      t.integer :user_id

      t.timestamps
    end
  end
end
