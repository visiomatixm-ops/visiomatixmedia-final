const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8086/api';

// careerService.ts
export async function submitCareerForm(formData: FormData) {
  const resp = await fetch(`${API_BASE_URL}/careers`, {
    method: 'POST',
    body: formData,
    // DO NOT set Content-Type header — browser sets multipart boundary automatically
  });
  return resp;
}

