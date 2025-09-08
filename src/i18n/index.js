import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      header: {
        home: 'Home',
        deals: 'Deals',
        newArrivals: 'New Arrivals',
        categories: 'Categories',
        vendorDashboard: 'Vendor Dashboard',
        adminDashboard: 'Admin Dashboard',
        search: 'Search products...',
        signIn: 'Sign in',
        signUp: 'Sign up',
        signOut: 'Sign out',
        profile: 'Profile',
        settings: 'Settings',
        wishlist: 'Wishlist'
      },
      product: {
        addToCart: 'Add to Cart',
        addToWishlist: 'Add to Wishlist',
        removeFromWishlist: 'Remove from Wishlist',
        compare: 'Compare',
        freeShipping: 'Free Shipping',
        inStock: 'In Stock',
        lowStock: 'Low Stock',
        outOfStock: 'Out of Stock',
        trending: '🔥 Trending',
        onlyLeft: 'Only {{count}} left!',
        leftInStock: '{{count}} left in stock',
        reviews: '{{count}} reviews',
        by: 'by'
      },
      trending: {
        title: 'Trending Now',
        hot: '🔥 Hot',
        recentlyAdded: 'Recently Added',
        new: 'New',
        popularCategories: 'Popular Categories',
        noTrending: 'No trending products at the moment'
      },
      comparison: {
        title: 'Product Comparison ({{count}})',
        clearAll: 'Clear All',
        price: 'Price',
        rating: 'Rating',
        reviews: 'Reviews',
        category: 'Category',
        availability: 'Availability',
        freeShipping: 'Free Shipping',
        returnPolicy: 'Return Policy',
        vendor: 'Vendor',
        removeFromComparison: 'Remove from comparison',
        addToComparison: 'Add to comparison'
      },
      cart: {
        title: 'Shopping Cart',
        empty: 'Your cart is empty',
        continueShopping: 'Continue Shopping',
        checkout: 'Checkout',
        total: 'Total',
        subtotal: 'Subtotal',
        shipping: 'Shipping',
        tax: 'Tax'
      },
      search: {
        placeholder: 'Search products, categories, or brands...',
        sortBy: 'Sort by:',
        priceHighToLow: 'Price: High to Low',
        priceLowToHigh: 'Price: Low to High',
        rating: 'Customer Rating',
        newest: 'Newest First',
        popularity: 'Most Popular',
        inProducts: 'in products',
        inCategories: 'in categories',
        inTags: 'in tags'
      },
      common: {
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        cancel: 'Cancel',
        save: 'Save',
        delete: 'Delete',
        edit: 'Edit',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        close: 'Close',
        yes: 'Yes',
        no: 'No'
      }
    }
  },
  es: {
    translation: {
      header: {
        home: 'Inicio',
        deals: 'Ofertas',
        newArrivals: 'Nuevos Productos',
        categories: 'Categorías',
        vendorDashboard: 'Panel del Vendedor',
        adminDashboard: 'Panel de Administrador',
        search: 'Buscar productos...',
        signIn: 'Iniciar sesión',
        signUp: 'Registrarse',
        signOut: 'Cerrar sesión',
        profile: 'Perfil',
        settings: 'Configuración',
        wishlist: 'Lista de deseos'
      },
      product: {
        addToCart: 'Agregar al Carrito',
        addToWishlist: 'Agregar a Lista de Deseos',
        removeFromWishlist: 'Quitar de Lista de Deseos',
        compare: 'Comparar',
        freeShipping: 'Envío Gratis',
        inStock: 'En Stock',
        lowStock: 'Stock Bajo',
        outOfStock: 'Agotado',
        trending: '🔥 Tendencia',
        onlyLeft: '¡Solo quedan {{count}}!',
        leftInStock: 'Quedan {{count}} en stock',
        reviews: '{{count}} reseñas',
        by: 'por'
      },
      trending: {
        title: 'Tendencias Actuales',
        hot: '🔥 Popular',
        recentlyAdded: 'Agregados Recientemente',
        new: 'Nuevo',
        popularCategories: 'Categorías Populares',
        noTrending: 'No hay productos en tendencia en este momento'
      },
      comparison: {
        title: 'Comparación de Productos ({{count}})',
        clearAll: 'Limpiar Todo',
        price: 'Precio',
        rating: 'Calificación',
        reviews: 'Reseñas',
        category: 'Categoría',
        availability: 'Disponibilidad',
        freeShipping: 'Envío Gratis',
        returnPolicy: 'Política de Devolución',
        vendor: 'Vendedor',
        removeFromComparison: 'Quitar de comparación',
        addToComparison: 'Agregar a comparación'
      },
      cart: {
        title: 'Carrito de Compras',
        empty: 'Tu carrito está vacío',
        continueShopping: 'Continuar Comprando',
        checkout: 'Finalizar Compra',
        total: 'Total',
        subtotal: 'Subtotal',
        shipping: 'Envío',
        tax: 'Impuestos'
      },
      search: {
        placeholder: 'Buscar productos, categorías o marcas...',
        sortBy: 'Ordenar por:',
        priceHighToLow: 'Precio: Mayor a Menor',
        priceLowToHigh: 'Precio: Menor a Mayor',
        rating: 'Calificación del Cliente',
        newest: 'Más Reciente Primero',
        popularity: 'Más Popular',
        inProducts: 'en productos',
        inCategories: 'en categorías',
        inTags: 'en etiquetas'
      },
      common: {
        loading: 'Cargando...',
        error: 'Error',
        success: 'Éxito',
        cancel: 'Cancelar',
        save: 'Guardar',
        delete: 'Eliminar',
        edit: 'Editar',
        back: 'Atrás',
        next: 'Siguiente',
        previous: 'Anterior',
        close: 'Cerrar',
        yes: 'Sí',
        no: 'No'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: typeof window !== 'undefined' ? ['localStorage', 'navigator', 'htmlTag'] : ['navigator', 'htmlTag'],
      caches: typeof window !== 'undefined' ? ['localStorage'] : []
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;