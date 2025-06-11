 document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('registrationForm');
            const successModal = document.getElementById('successModal');
            const modalClose = document.getElementById('modalClose');
            const userDetails = document.getElementById('userDetails');

            // Form submission handler
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateForm()) {
                    showSuccessModal();
                }
            });

            // Reset form handler
            form.addEventListener('reset', function(e) {
                if (!confirm('Are you sure you want to clear the ritual circle?')) {
                    e.preventDefault();
                    return;
                }
                clearAllErrors();
            });

            // Close modal handlers
            modalClose.addEventListener('click', closeModal);
            
            window.addEventListener('click', function(e) {
                if (e.target === successModal) {
                    closeModal();
                }
            });

            // Real-time validation
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
                
                input.addEventListener('input', function() {
                    clearError(this);
                });
            });

            function validateField(field) {
                const fieldName = field.name;
                const value = field.value.trim();
                
                let isValid = true;
                let errorMessage = '';

                switch (fieldName) {
                    case 'firstName':
                    case 'lastName':
                        if (!value) {
                            errorMessage = 'This field is required by the dark spirits';
                            isValid = false;
                        } else if (value.length < 2) {
                            errorMessage = 'Name must be at least 2 characters long';
                            isValid = false;
                        }
                        break;

                    case 'email':
                        if (!value) {
                            errorMessage = 'Email is required for supernatural communication';
                            isValid = false;
                        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                            errorMessage = 'Please enter a valid email address';
                            isValid = false;
                        }
                        break;

                    case 'phone':
                        if (!value) {
                            errorMessage = 'Phone number is required for emergency séances';
                            isValid = false;
                        } else if (!/^[\d\s\-\+\(\)]{10,}$/.test(value)) {
                            errorMessage = 'Please enter a valid phone number';
                            isValid = false;
                        }
                        break;

                    case 'dateOfBirth':
                        if (!value) {
                            errorMessage = 'Birth date determines your supernatural alignment';
                            isValid = false;
                        } else {
                            const birthDate = new Date(value);
                            const today = new Date();
                            const age = today.getFullYear() - birthDate.getFullYear();
                            
                            if (age < 16) {
                                errorMessage = 'Must be at least 16 years old to handle dark knowledge';
                                isValid = false;
                            } else if (age > 150) {
                                errorMessage = 'Even vampires need realistic ages';
                                isValid = false;
                            }
                        }
                        break;

                    case 'course':
                        if (!value) {
                            errorMessage = 'You must choose your path in the dark arts';
                            isValid = false;
                        }
                        break;

                    case 'experience':
                        if (!value) {
                            errorMessage = 'Please reveal your current power level';
                            isValid = false;
                        }
                        break;

                    case 'address':
                        if (!value) {
                            errorMessage = 'We need to know where to send the ravens';
                            isValid = false;
                        } else if (value.length < 10) {
                            errorMessage = 'Please provide a complete address';
                            isValid = false;
                        }
                        break;

                    case 'motivation':
                        if (!value) {
                            errorMessage = 'Your dark motivations must be revealed';
                            isValid = false;
                        } else if (value.length < 20) {
                            errorMessage = 'Please elaborate on your dark ambitions (at least 20 characters)';
                            isValid = false;
                        }
                        break;

                    case 'terms':
                        if (!field.checked) {
                            errorMessage = 'You must accept the dark covenant to proceed';
                            isValid = false;
                        }
                        break;
                }

                if (!isValid) {
                    showError(field, errorMessage);
                } else {
                    clearError(field);
                }

                return isValid;
            }

            function validateForm() {
                let isFormValid = true;
                
                inputs.forEach(input => {
                    if (!validateField(input)) {
                        isFormValid = false;
                    }
                });

                const termsCheckbox = document.getElementById('terms');
                if (!validateField(termsCheckbox)) {
                    isFormValid = false;
                }

                return isFormValid;
            }

            function showError(field, message) {
                const errorElement = document.getElementById(field.name + 'Error');
                if (errorElement) {
                    errorElement.textContent = message;
                    errorElement.classList.add('show');
                }
                
                field.style.borderColor = '#8b0000';
                field.style.boxShadow = '0 0 10px rgba(139, 0, 0, 0.5)';
            }

            function clearError(field) {
                const errorElement = document.getElementById(field.name + 'Error');
                if (errorElement) {
                    errorElement.textContent = '';
                    errorElement.classList.remove('show');
                }
                
                field.style.borderColor = '';
                field.style.boxShadow = '';
            }

            function clearAllErrors() {
                inputs.forEach(input => {
                    clearError(input);
                });
                
                const termsCheckbox = document.getElementById('terms');
                if (termsCheckbox) {
                    clearError(termsCheckbox);
                }
            }

            function showSuccessModal() {
                const formData = new FormData(form);
                const data = {};
                
                for (let [key, value] of formData.entries()) {
                    data[key] = value;
                }

                const detailsHTML = `
                    <h4>🎭 Your Dark Profile 🎭</h4>
                    <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Phone:</strong> ${data.phone}</p>
                    <p><strong>Date of Birth:</strong> ${data.dateOfBirth}</p>
                    <p><strong>Chosen Path:</strong> ${getCourseDisplayName(data.course)}</p>
                    <p><strong>Experience Level:</strong> ${getExperienceDisplayName(data.experience)}</p>
                    <p><strong>Haunting Address:</strong> ${data.address}</p>
                    <p><strong>Dark Motivations:</strong> ${data.motivation.substring(0, 100)}${data.motivation.length > 100 ? '...' : ''}</p>
                    <p><strong>Newsletter Subscription:</strong> ${data.newsletter ? 'Yes - Prepare for midnight knowledge!' : 'No'}</p>
                `;

                userDetails.innerHTML = detailsHTML;
                successModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }

            function getCourseDisplayName(course) {
                const courseNames = {
                    'necromancy': 'Necromancy & Death Studies',
                    'divination': 'Divination & Fortune Telling',
                    'alchemy': 'Dark Alchemy',
                    'supernatural': 'Supernatural Psychology',
                    'cryptozoology': 'Cryptozoology',
                    'occult': 'Occult History'
                };
                return courseNames[course] || course;
            }

            function getExperienceDisplayName(experience) {
                const experienceNames = {
                    'novice': 'Novice (Beginner)',
                    'apprentice': 'Apprentice (Intermediate)',
                    'adept': 'Adept (Advanced)',
                    'master': 'Master (Expert)'
                };
                return experienceNames[experience] || experience;
            }

            function closeModal() {
                successModal.classList.remove('show');
                document.body.style.overflow = '';
                form.reset();
                clearAllErrors();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Escape key closes modal
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && successModal.classList.contains('show')) {
                    closeModal();
                }
            });
        });
