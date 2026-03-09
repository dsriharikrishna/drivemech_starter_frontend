# PowerShell script to reorder docs page sections
$filePath = "c:\Users\Lenovo\OneDrive\Documents\Projects\drivemech-webapplication\src\app\(drivemech)\docs\page.tsx"

# Read the entire file
$content = Get-Content $filePath -Raw

# Extract sections using regex
$sections = @{}
$pattern = '(?s)(\s+{/\* ([^*]+) Section \*/\}.*?</section>)'
$matches = [regex]::Matches($content, $pattern)

foreach ($match in $matches) {
    $name = $match.Groups[2].Value.Trim()
    $sectionContent = $match.Groups[1].Value
    $sections[$name] = $sectionContent
}

# Define the correct order matching tabs array
$correctOrder = @(
    # Basic UI Components
    'Button', 'Card', 'Avatar', 'StatusBadge', 'Divider', 'Loader', 'LoadingSpinner', 
    'Tooltip', 'CopyClipboard', 'Typography',
    # Form Components
    'Form Inputs', 'Advanced Inputs', 'CommonNumberInput', 'SharePercentageInput',
    'DropDown', 'MultiSelectDropdown', 'Date Picker', 'Time Picker', 'ToggleSwitch', 
    'RichTextEditor',
    # Layout Components
    'Accordion', 'Tabs', 'Filled Tabs', 'ScrollableTabs', 'Table', 'Stepper', 
    'Horizontal Stepper', 'Timeline',
    # Feedback Components
    'Dialog', 'Toast', 'LeftDrawer', 'RightDrawer', 'Menu',
    # Advanced Components
    'Smooth Animation'
)

# Extract header (everything before first section)
$headerPattern = '(?s)(.*?){/\* Date Picker Section \*/\}'
$headerMatch = [regex]::Match($content, $headerPattern)
$header = $headerMatch.Groups[1].Value

# Extract footer (everything after last section)
$footerPattern = '(?s)(</section>\s+{/\* Footer \*/\}.*)'
$footerMatches = [regex]::Matches($content, $footerPattern)
$footer = $footerMatches[-1].Value.Substring($footerMatches[-1].Value.IndexOf('{/* Footer */}'))

# Build the new content
$newContent = $header

# Add sections in correct order
foreach ($sectionName in $correctOrder) {
    if ($sections.ContainsKey($sectionName)) {
        $newContent += $sections[$sectionName]
        $newContent += "`r`n"
    } else {
        Write-Warning "Section not found: $sectionName"
    }
}

# Add footer
$newContent += "`r`n            " + $footer

# Write the new content
$newContent | Set-Content $filePath -NoNewline

Write-Output "Reorganization complete! Reordered $($sections.Count) sections."
