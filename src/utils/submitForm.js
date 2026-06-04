export const submitContactForm = async (formData, scriptUrl) => {
  try {
    await fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Dengan no-cors, kita tidak bisa membaca response
    // Tapi data tetap terkirim ke Google Sheets
    console.log('Form submitted successfully');
    return { success: true };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};