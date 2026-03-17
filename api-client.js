// API Client pour le Dashboard Formateurs
const API_URL = window.location.origin;

const API = {
    // ==================== FORMATEURS ====================
    async getFormateurs() {
        const res = await fetch(`${API_URL}/api/formateurs`);
        if (!res.ok) throw new Error('Erreur chargement formateurs');
        return await res.json();
    },

    async createFormateur(data) {
        const res = await fetch(`${API_URL}/api/formateurs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Erreur création formateur');
        return await res.json();
    },

    async updateFormateur(id, data) {
        const res = await fetch(`${API_URL}/api/formateurs/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Erreur mise à jour formateur');
        return await res.json();
    },

    async deleteFormateur(id) {
        const res = await fetch(`${API_URL}/api/formateurs/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Erreur suppression formateur');
        return await res.json();
    },

    // ==================== CANDIDATS ====================
    async getCandidats() {
        const res = await fetch(`${API_URL}/api/candidats`);
        if (!res.ok) throw new Error('Erreur chargement candidats');
        return await res.json();
    },

    async createCandidat(data) {
        const res = await fetch(`${API_URL}/api/candidats`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Erreur création candidat');
        return await res.json();
    },

    async updateCandidat(id, data) {
        const res = await fetch(`${API_URL}/api/candidats/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Erreur mise à jour candidat');
        return await res.json();
    },

    async deleteCandidat(id) {
        const res = await fetch(`${API_URL}/api/candidats/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Erreur suppression candidat');
        return await res.json();
    },

    // ==================== BESOINS ====================
    async getBesoins() {
        const res = await fetch(`${API_URL}/api/besoins`);
        if (!res.ok) throw new Error('Erreur chargement besoins');
        return await res.json();
    },

    async createBesoin(data) {
        const res = await fetch(`${API_URL}/api/besoins`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Erreur création besoin');
        return await res.json();
    },

    async updateBesoin(id, data) {
        const res = await fetch(`${API_URL}/api/besoins/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Erreur mise à jour besoin');
        return await res.json();
    },

    async deleteBesoin(id) {
        const res = await fetch(`${API_URL}/api/besoins/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Erreur suppression besoin');
        return await res.json();
    }
};
