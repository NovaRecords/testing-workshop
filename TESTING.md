# Testing Documentation

## Test Coverage Report
[Platzhalter für Screenshot des Coverage Reports - Bitte fügen Sie den Screenshot hier ein]

## Entdeckte Fehler und Edge Cases

1. **Grenzwertproblematik bei Bonuspunkten**
   - **Problem**: Bei einem Score von 95 und mehr als 3 Bonuskategorien könnte theoretisch ein Score über 100 entstehen
   - **Lösung**: Implementierung einer Obergrenze von 100 Punkten auch nach Bonuspunkten
   - **Test**: `should not exceed 100 points with bonus`

2. **NaN-Behandlung in Strict Mode**
   - **Problem**: NaN könnte als gültige Zahl durchgehen
   - **Lösung**: Explizite Prüfung auf NaN im Strict Mode
   - **Test**: `should reject NaN in strict mode`

3. **Grenzwerte bei Notenübergängen**
   - **Problem**: Unklare Behandlung von Grenzwerten zwischen Notenstufen
   - **Lösung**: Präzise Definition der Notengrenzen (z.B. 89.9 → B, 90.0 → A)
   - **Test**: `should handle grade boundaries`

## Test-Struktur

Die Tests sind nach dem AAA-Pattern (Arrange-Act-Assert) strukturiert und in logische Gruppen unterteilt:

1. **Basic Validation**
   - Grundlegende Eingabevalidierung
   - Typ- und Bereichsprüfungen

2. **Strict Mode Validation**
   - Zusätzliche Validierungen im strikten Modus
   - Ganzzahlen- und NaN-Prüfung

3. **Bonus Categories**
   - Berechnung von Bonuspunkten
   - Maximalgrenzen-Logik

4. **Passing Threshold**
   - Standard- und benutzerdefinierte Bestehensgrenze

5. **Grade Calculation**
   - Notenvergabe basierend auf Punktzahlen
   - Grenzwertfälle

## TDD-Ansatz: Vor- und Nachteile

**Vorteile:**
- Klare Anforderungsdefinition durch Tests vor der Implementierung
- Hohe Testabdeckung von Anfang an
- Vermeidung von überflüssigem Code durch testgetriebene Entwicklung
- Schnelles Feedback bei Änderungen
- Verbesserte Codequalität durch testbares Design

**Nachteile:**
- Initial höherer Zeitaufwand für Testentwicklung
- Mögliche Überoptimierung für Testfälle
- Lernkurve für neue Teammitglieder
- Schwierigkeit bei der Definition von Tests für unklare Anforderungen
- Gefahr der zu engen Kopplung zwischen Tests und Implementierung

## GitHub Actions

[Platzhalter für Screenshot der erfolgreichen GitHub Action - Bitte fügen Sie den Screenshot hier ein]
