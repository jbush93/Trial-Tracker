class Trial < ApplicationRecord
    has_many :patients, dependent: :destroy
    has_many :notes, through: :patients
    has_many :measurements, through: :patients
    has_many :outcomes, dependent: :destroy
    has_many :arm_groups, dependent: :destroy
    has_many :locations, dependent: :destroy
    has_many :conditions, dependent: :destroy
end
