import { describe, it, expect } from 'vitest';
import { validateScore } from '../src/validateScore.js';

describe('validateScore', () => {
  // Basisvalidierung
  describe('basic validation', () => {
    it('should accept valid scores', () => {
      const result = validateScore(75);
      expect(result.valid).toBe(true);
      expect(result.score).toBe(75);
    });

    it('should reject undefined score', () => {
      const result = validateScore(undefined);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Score ist erforderlich');
    });

    it('should reject non-numeric scores', () => {
      const result = validateScore('75');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Score muss eine Zahl sein');
    });

    it('should reject scores outside valid range', () => {
      const resultNegative = validateScore(-1);
      expect(resultNegative.valid).toBe(false);
      expect(resultNegative.errors).toContain('Score muss zwischen 0 und 100 liegen');

      const resultTooHigh = validateScore(101);
      expect(resultTooHigh.valid).toBe(false);
      expect(resultTooHigh.errors).toContain('Score muss zwischen 0 und 100 liegen');
    });
  });

  // Strikte Validierung
  describe('strict mode validation', () => {
    it('should reject non-integer scores in strict mode', () => {
      const result = validateScore(75.5, { strictMode: true });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Score muss eine ganze Zahl sein');
    });

    it('should accept integer scores in strict mode', () => {
      const result = validateScore(75, { strictMode: true });
      expect(result.valid).toBe(true);
      expect(result.score).toBe(75);
    });

    it('should reject NaN in strict mode', () => {
      const result = validateScore(NaN, { strictMode: true });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Score muss eine gültige Zahl sein');
    });
  });

  // Bonuskategorien
  describe('bonus categories', () => {
    it('should add bonus points for categories', () => {
      const result = validateScore(75, { bonusCategories: ['creativity', 'presentation'] });
      expect(result.score).toBe(79); // 75 + (2 * 2)
    });

    it('should limit bonus points to maximum of 10', () => {
      const result = validateScore(75, {
        bonusCategories: ['cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6']
      });
      expect(result.score).toBe(85); // 75 + 10 (max bonus)
    });

    it('should not exceed 100 points with bonus', () => {
      const result = validateScore(95, { bonusCategories: ['cat1', 'cat2', 'cat3'] });
      expect(result.score).toBe(100);
    });
  });

  // Bestandsprüfung
  describe('passing threshold', () => {
    it('should pass with default threshold', () => {
      const result = validateScore(60);
      expect(result.passed).toBe(true);
    });

    it('should fail with default threshold', () => {
      const result = validateScore(59);
      expect(result.passed).toBe(false);
    });

    it('should respect custom passing threshold', () => {
      const result = validateScore(65, { passingScore: 70 });
      expect(result.passed).toBe(false);
    });
  });

  // Notenberechnung
  describe('grade calculation', () => {
    it('should assign grade A for scores >= 90', () => {
      const result = validateScore(90);
      expect(result.grade).toBe('A');
    });

    it('should assign grade B for scores 80-89', () => {
      const result = validateScore(85);
      expect(result.grade).toBe('B');
    });

    it('should assign grade C for scores 70-79', () => {
      const result = validateScore(75);
      expect(result.grade).toBe('C');
    });

    it('should assign grade D for scores 60-69', () => {
      const result = validateScore(65);
      expect(result.grade).toBe('D');
    });

    it('should assign grade F for scores < 60', () => {
      const result = validateScore(55);
      expect(result.grade).toBe('F');
    });
  });

  // Edge Cases
  describe('edge cases', () => {
    it('should handle minimum passing score', () => {
      const result = validateScore(60);
      expect(result.passed).toBe(true);
      expect(result.grade).toBe('D');
    });

    it('should handle grade boundaries', () => {
      expect(validateScore(89).grade).toBe('B');
      expect(validateScore(90).grade).toBe('A');
      expect(validateScore(79).grade).toBe('C');
      expect(validateScore(80).grade).toBe('B');
      expect(validateScore(69).grade).toBe('D');
      expect(validateScore(70).grade).toBe('C');
      expect(validateScore(59).grade).toBe('F');
      expect(validateScore(60).grade).toBe('D');
    });

    it('should handle exact scores of 0 and 100', () => {
      const resultZero = validateScore(0);
      expect(resultZero.valid).toBe(true);
      expect(resultZero.grade).toBe('F');

      const resultHundred = validateScore(100);
      expect(resultHundred.valid).toBe(true);
      expect(resultHundred.grade).toBe('A');
    });
  });
});