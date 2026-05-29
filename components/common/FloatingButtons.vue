<template>
  <div class="floating-buttons d-none d-md-block">
    <a 
      href="tel:+5072060019" 
      class="floating-btn phone-btn"
      aria-label="Llamar"
    >
      <i class="fas fa-phone"></i>
    </a>
    <a 
      href="https://wa.me/50769422262" 
      target="_blank"
      class="floating-btn whatsapp-btn"
      aria-label="WhatsApp"
    >
      <i class="fab fa-whatsapp"></i>
    </a>
  </div>
</template>

<style scoped>
.floating-buttons {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.floating-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.floating-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  color: white;
}

.phone-btn {
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #01b4e4, #0095c8);
}

.whatsapp-btn {
  background: linear-gradient(135deg, #25d366, #128c7e);
}
</style>
