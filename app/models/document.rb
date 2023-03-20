class Document < ApplicationRecord
  belongs_to :patient
  validates :title, presence: true
  validates :patient_id, presence: true

  has_one_attached :pdf, service: :google

  def pdf_url
    Rails.application.routes.url_helpers.url_for(pdf) if pdf.attached?
  end
end
