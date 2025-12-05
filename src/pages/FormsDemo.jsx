import React, { useState } from 'react';
import axios from 'axios';
import '../styles/FormsDemo.css';

export default function FormsDemo() {
  const [formData, setFormData] = useState({
    text: '',
    email: '',
    password: '',
    number: '',
    range: 50,
    checkbox: false,
    checkboxMultiple: [],
    radio: '',
    select: '',
    multiSelect: [],
    textarea: '',
    date: '',
    time: '',
    datetime: '',
    month: '',
    week: '',
    color: '#6366f1',
    file: null,
    url: '',
    tel: '',
    search: '',
    hidden: 'hidden-value',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;

    if (type === 'checkbox') {
      if (name === 'checkbox') {
        setFormData(prev => ({ ...prev, checkbox: checked }));
      } else if (name === 'checkboxMultiple') {
        setFormData(prev => ({
          ...prev,
          checkboxMultiple: checked
            ? [...prev.checkboxMultiple, value]
            : prev.checkboxMultiple.filter(v => v !== value),
        }));
      }
    } else if (type === 'radio') {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files?.[0] || null }));
    } else if (name === 'multiSelect') {
      const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
      setFormData(prev => ({ ...prev, multiSelect: selectedValues }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Créer FormData pour traiter les fichiers
      const submitData = new FormData();
      
      // Ajouter tous les champs normaux
      Object.keys(formData).forEach(key => {
        if (key === 'file') {
          if (formData.file) {
            submitData.append('file', formData.file);
          }
        } else if (Array.isArray(formData[key])) {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          submitData.append(key, formData[key]);
        }
      });

      // Utiliser axios pour envoyer les données
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage({
        type: 'success',
        text: `✅ Formulaire soumis avec succès! ID: ${response.data.id}`,
      });
      console.log('Response from server:', response.data);
    } catch (error) {
      setMessage({
        type: 'error',
        text: `❌ Erreur lors de la soumission: ${error.message}`,
      });
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      text: '',
      email: '',
      password: '',
      number: '',
      range: 50,
      checkbox: false,
      checkboxMultiple: [],
      radio: '',
      select: '',
      multiSelect: [],
      textarea: '',
      date: '',
      time: '',
      datetime: '',
      month: '',
      week: '',
      color: '#6367f1',
      file: null,
      url: '',
      tel: '',
      search: '',
      hidden: 'hidden-value',
    });
  };

  return (
    <div className="forms-demo">
      <div className="forms-header">
        <h1>📝 Tous les types de formulaires HTML</h1>
        <p>✨ Exemple complet avec tous les types d'inputs disponibles en HTML5.</p>
      </div>

      <form onSubmit={handleSubmit} className="demo-form">
        {/* Text Input */}
        <fieldset>
          <legend>📝 Inputs texte</legend>

          <div className="form-group">
            <label htmlFor="text">Text:</label>
            <input
              type="text"
              id="text"
              name="text"
              value={formData.text}
              onChange={handleChange}
              placeholder="Entrez du texte"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tel">Téléphone:</label>
            <input
              type="tel"
              id="tel"
              name="tel"
              value={formData.tel}
              onChange={handleChange}
              placeholder="+33 1 23 45 67 89"
            />
          </div>

          <div className="form-group">
            <label htmlFor="url">URL:</label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="search">Recherche:</label>
            <input
              type="search"
              id="search"
              name="search"
              value={formData.search}
              onChange={handleChange}
              placeholder="Rechercher..."
            />
          </div>
        </fieldset>

        {/* Number & Range */}
        <fieldset>
          <legend>🔢 Nombres & Plages</legend>

          <div className="form-group">
            <label htmlFor="number">Nombre:</label>
            <input
              type="number"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="0"
              min="0"
              max="100"
            />
          </div>

          <div className="form-group">
            <label htmlFor="range">Range (0-100): <span>{formData.range}</span></label>
            <input
              type="range"
              id="range"
              name="range"
              value={formData.range}
              onChange={handleChange}
              min="0"
              max="100"
            />
          </div>
        </fieldset>

        {/* Checkboxes */}
        <fieldset>
          <legend>☑️ Boîtes à cocher (Checkboxes)</legend>

          <div className="form-group checkbox-group">
            <label htmlFor="checkbox">
              <input
                type="checkbox"
                id="checkbox"
                name="checkbox"
                checked={formData.checkbox}
                onChange={handleChange}
              />
              Accepter les conditions d'utilisation
            </label>
          </div>

          <div className="form-group">
            <legend className="sub-legend">Sélectionnez plusieurs options:</legend>
            <div className="checkbox-group">
              {['Option 1', 'Option 2', 'Option 3', 'Option 4'].map((opt, i) => (
                <label key={i}>
                  <input
                    type="checkbox"
                    name="checkboxMultiple"
                    value={opt}
                    checked={formData.checkboxMultiple.includes(opt)}
                    onChange={handleChange}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        </fieldset>

        {/* Radio */}
        <fieldset>
          <legend>🔘 Boutons radio</legend>

          <div className="form-group">
            <div className="radio-group">
              {['Option A', 'Option B', 'Option C'].map((opt, i) => (
                <label key={i}>
                  <input
                    type="radio"
                    name="radio"
                    value={opt}
                    checked={formData.radio === opt}
                    onChange={handleChange}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        </fieldset>

        {/* Select */}
        <fieldset>
          <legend>📋 Listes déroulantes</legend>

          <div className="form-group">
            <label htmlFor="select">Sélectionnez une option:</label>
            <select
              id="select"
              name="select"
              value={formData.select}
              onChange={handleChange}
            >
              <option value="">-- Choisir une option --</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              <optgroup label="Groupe 2">
                <option value="option4">Option 4</option>
                <option value="option5">Option 5</option>
              </optgroup>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="multiSelect">Sélectionnez plusieurs options (Ctrl+Click):</label>
            <select
              id="multiSelect"
              name="multiSelect"
              multiple
              value={formData.multiSelect}
              onChange={handleChange}
              size={5}
            >
              <option value="opt1">Choix 1</option>
              <option value="opt2">Choix 2</option>
              <option value="opt3">Choix 3</option>
              <option value="opt4">Choix 4</option>
              <option value="opt5">Choix 5</option>
            </select>
          </div>
        </fieldset>

        {/* Textarea */}
        <fieldset>
          <legend>📄 Zone de texte</legend>

          <div className="form-group">
            <label htmlFor="textarea">Textarea:</label>
            <textarea
              id="textarea"
              name="textarea"
              value={formData.textarea}
              onChange={handleChange}
              placeholder="Entrez un texte plus long..."
              rows="4"
            />
          </div>
        </fieldset>

        {/* Date & Time */}
        <fieldset>
          <legend>📅 Dates & Heures</legend>

          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Heure:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="datetime">Date et Heure (local):</label>
            <input
              type="datetime-local"
              id="datetime"
              name="datetime"
              value={formData.datetime}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="month">Mois:</label>
            <input
              type="month"
              id="month"
              name="month"
              value={formData.month}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="week">Semaine:</label>
            <input
              type="week"
              id="week"
              name="week"
              value={formData.week}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        {/* Color */}
        <fieldset>
          <legend>🎨 Couleur</legend>

          <div className="form-group">
            <label htmlFor="color">Sélectionnez une couleur:</label>
            <div className="color-input-group">
              <input
                type="color"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
              />
              <span className="color-value">{formData.color}</span>
            </div>
          </div>
        </fieldset>

        {/* File */}
        <fieldset>
          <legend>📁 Fichier</legend>

          <div className="form-group">
            <label htmlFor="file">Télécharger un fichier:</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleChange}
              accept="image/*,.pdf"
            />
            {formData.file && <p>Fichier sélectionné: {formData.file.name}</p>}
          </div>
        </fieldset>

        {/* Hidden input */}
        <input type="hidden" name="hidden" value={formData.hidden} />

        {/* Buttons */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '⏳ Envoi en cours...' : '📤 Soumettre avec Axios'}
          </button>
          <button type="reset" onClick={handleReset} className="btn btn-secondary" disabled={loading}>
            🔄 Réinitialiser
          </button>
        </div>

        {/* Message de réponse */}
        {message.text && (
          <div className={`message message-${message.type}`}>
            {message.text}
          </div>
        )}
      </form>

      {/* Display current form state */}
      <div className="form-state">
        <h3>État actuel du formulaire:</h3>
        <pre>{JSON.stringify(formData, (key, value) => {
          if (key === 'file' && value) {
            return `[File: ${value.name}]`;
          }
          return value;
        }, 2)}</pre>
      </div>
    </div>
  );
}
