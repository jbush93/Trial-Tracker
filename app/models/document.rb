class Document < ApplicationRecord
  belongs_to :patient
  validates :title, presence: true
  validates :patient_id, presence: true

  has_one_attached :pdf, service: :google

  def pdf_url
    if self.pdf.attached?
      return 'https://storage.googleapis.com/trial-tracker-documents-bucket/' + self.pdf.key
   else 
       return nil
   end
  end
end
