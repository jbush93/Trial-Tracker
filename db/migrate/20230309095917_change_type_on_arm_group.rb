class ChangeTypeOnArmGroup < ActiveRecord::Migration[7.0]
  def change
    rename_column :arm_groups, :type, :group_type
    #Ex:- rename_column("admin_users", "pasword","hashed_pasword")
  end
end
