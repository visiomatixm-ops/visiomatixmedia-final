// careerService.ts
export async function submitCareerForm(formData: FormData) {
  const resp = await fetch('http://localhost:8080/api/careers', {
    method: 'POST',
    body: formData,
    // DO NOT set Content-Type header — browser sets multipart boundary automatically
  });
  return resp;
}
